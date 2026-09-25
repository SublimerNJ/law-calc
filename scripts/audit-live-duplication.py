#!/usr/bin/env python3
"""Audit cross-page text duplication on a deployed (or local) law-calc build.

Fetches every URL in <base>/sitemap.xml, extracts the visible text inside
<main>...</main>, splits it into lines and reports:

  * lines (>= MIN_LINE_CHARS chars) that repeat on >= MIN_PAGES pages
  * per-page total vs unique characters (unique = lines not repeated site-wide)

Exit 1 if any repeated line is not in ALLOWLIST (site chrome only).

Usage:
  python3 scripts/audit-live-duplication.py                       # https://law-calc.kr
  python3 scripts/audit-live-duplication.py https://law-calc.kr
  python3 scripts/audit-live-duplication.py --local http://localhost:3000
  python3 scripts/audit-live-duplication.py --allow extra-allow.txt --allow-line "문구"

stdlib only.
"""

from __future__ import annotations

import argparse
import html
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed

# Lines that are legitimately identical on every page (site chrome).
# Keep this list SHORT — later tasks may edit it, but only for true chrome
# (contact address, one disclaimer line), never for calculator body copy.
ALLOWLIST: list[str] = [
    "sublimernj@gmail.com",
]

MIN_LINE_CHARS = 15
MIN_PAGES = 3
CONCURRENCY = 8
TIMEOUT_S = 20
USER_AGENT = "law-calc-duplication-audit/1.0 (+https://law-calc.kr)"

BLOCK_TAGS = (
    "address|article|aside|blockquote|br|dd|details|div|dl|dt|figcaption|figure|footer|"
    "form|h1|h2|h3|h4|h5|h6|header|hr|li|main|nav|ol|p|pre|section|summary|table|tbody|"
    "td|tfoot|th|thead|tr|ul|button|label|option|select|textarea"
)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=TIMEOUT_S) as resp:
        charset = resp.headers.get_content_charset() or "utf-8"
        return resp.read().decode(charset, errors="replace")


def sitemap_urls(base: str) -> list[str]:
    xml = fetch(base.rstrip("/") + "/sitemap.xml")
    root = ET.fromstring(xml)
    locs = [el.text.strip() for el in root.iter() if el.tag.endswith("loc") and el.text]
    # Rewrite host so --local audits the local server, not production.
    b = urllib.parse.urlsplit(base)
    out = []
    for loc in locs:
        u = urllib.parse.urlsplit(loc)
        out.append(urllib.parse.urlunsplit((b.scheme, b.netloc, u.path, u.query, "")))
    return sorted(set(out))


def main_lines(page_html: str) -> list[str]:
    m = re.search(r"<main\b[^>]*>(.*)</main>", page_html, flags=re.S | re.I)
    body = m.group(1) if m else ""
    body = re.sub(r"<(script|style|noscript|template|svg)\b[^>]*>.*?</\1>", " ", body, flags=re.S | re.I)
    body = re.sub(r"<!--.*?-->", " ", body, flags=re.S)
    body = re.sub(rf"</?(?:{BLOCK_TAGS})\b[^>]*>", "\n", body, flags=re.I)
    body = re.sub(r"<[^>]+>", "", body)
    body = html.unescape(body)
    lines = []
    for raw in body.split("\n"):
        line = re.sub(r"\s+", " ", raw).strip()
        if len(line) >= MIN_LINE_CHARS:
            lines.append(line)
    return lines


def load_allowlist(files: list[str], inline: list[str]) -> set[str]:
    allowed = {a.strip() for a in ALLOWLIST}
    for path in files:
        with open(path, encoding="utf-8") as fh:
            allowed.update(line.strip() for line in fh if line.strip() and not line.startswith("#"))
    allowed.update(a.strip() for a in inline)
    return allowed


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("base", nargs="?", default="https://law-calc.kr", help="base URL (default https://law-calc.kr)")
    ap.add_argument("--local", metavar="URL", help="audit a local server instead, e.g. http://localhost:3000")
    ap.add_argument("--allow", action="append", default=[], metavar="FILE", help="file of allowed lines (one per line)")
    ap.add_argument("--allow-line", action="append", default=[], metavar="TEXT", help="inline allowed line")
    ap.add_argument("--top", type=int, default=0, help="print only the N most repeated lines (0 = all)")
    args = ap.parse_args()

    base = (args.local or args.base).rstrip("/")
    allowed = load_allowlist(args.allow, args.allow_line)

    try:
        urls = sitemap_urls(base)
    except Exception as exc:  # noqa: BLE001
        print(f"ERROR: cannot read sitemap at {base}/sitemap.xml: {exc}", file=sys.stderr)
        return 2

    pages: dict[str, list[str]] = {}
    errors: list[str] = []
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
        futs = {pool.submit(fetch, u): u for u in urls}
        for fut in as_completed(futs):
            u = futs[fut]
            try:
                pages[u] = main_lines(fut.result())
            except Exception as exc:  # noqa: BLE001
                errors.append(f"{u}: {exc}")

    line_pages: dict[str, set[str]] = defaultdict(set)
    for u, lines in pages.items():
        for line in set(lines):
            line_pages[line].add(u)

    repeated = {line: len(us) for line, us in line_pages.items() if len(us) >= MIN_PAGES}
    violations = {line: n for line, n in repeated.items() if line not in allowed}

    print(f"# base: {base}")
    print(f"# pages in sitemap: {len(urls)}, fetched: {len(pages)}, errors: {len(errors)}")
    for e in errors:
        print(f"#   fetch error: {e}")
    no_main = [u for u, lines in pages.items() if not lines]
    if no_main:
        print(f"# pages with empty <main> text: {len(no_main)}")

    print(f"\n## Lines (>= {MIN_LINE_CHARS} chars) repeated on >= {MIN_PAGES} pages: {len(repeated)} "
          f"(not allowlisted: {len(violations)})")
    ranked = sorted(repeated.items(), key=lambda kv: (-kv[1], kv[0]))
    if args.top:
        ranked = ranked[: args.top]
    for line, n in ranked:
        flag = "  " if line in allowed else "!!"
        shown = line if len(line) <= 120 else line[:117] + "..."
        print(f"{flag} {n:4d}  {shown}")

    print("\n## Per-page text (chars): total / unique (not repeated on >= "
          f"{MIN_PAGES} pages) / unique%")
    rows = []
    for u, lines in pages.items():
        total = sum(len(l) for l in lines)
        unique = sum(len(l) for l in lines if l not in repeated)
        rows.append((unique / total * 100 if total else 0.0, u, total, unique))
    for pct, u, total, unique in sorted(rows):
        path = urllib.parse.urlsplit(u).path or "/"
        print(f"{total:7d} {unique:7d} {pct:5.1f}%  {path}")

    if violations:
        print(f"\nFAIL: {len(violations)} repeated line(s) outside the allowlist.", file=sys.stderr)
        return 1
    if errors:
        print(f"\nFAIL: {len(errors)} page(s) could not be fetched.", file=sys.stderr)
        return 1
    print("\nOK: no repeated lines outside the allowlist.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
