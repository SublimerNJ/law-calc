#!/usr/bin/env python3
r"""Audit cross-page text duplication on a deployed (or local) law-calc build.

Fetches every URL in <base>/sitemap.xml, extracts the visible text inside
<main>...</main>, splits it into lines and reports:

  * exact lines that repeat on >= MIN_PAGES pages (count only)
  * NORMALIZED lines that repeat on >= MIN_PAGES pages (these decide the exit code)
  * per-page total vs unique characters (unique = normalized key not repeated)

Normalization rule (shared with scripts/verify-adsense-content-quality.js),
applied IN THIS ORDER so template sentences that differ only by calculator
name / quoted FAQ title / number collapse to one key:
  1. the page's calculator name (its <h1> text)          -> <N>
  2. 「[^」]*」|"[^"]*"|“[^”]*”   (quoted span)            -> 「Q」
  3. \d+                         (digit run)              -> #
  then collapse whitespace.

Line floor: block lines need >= MIN_LINE_CHARS chars, but <li> items are kept
from LI_MIN_CHARS so short category-shared input items ("소정근로시간") count.
Link-only <li> (navigation: a single <a>) keep the normal floor.

Allowlist: at most MAX_ALLOWLIST entries in total (built-in + --allow files +
--allow-line): one site-wide disclaimer line and optionally the contact email
line. More entries -> exit 1. Calculator body copy never belongs here.

Exit 1 if any normalized repeat is not allowlisted, a page fails to fetch, or
the allowlist is over the cap. Exit 2 if the sitemap cannot be read.

Usage:
  python3 scripts/audit-live-duplication.py                       # https://law-calc.kr
  python3 scripts/audit-live-duplication.py https://law-calc.kr
  python3 scripts/audit-live-duplication.py --local http://localhost:3000
  python3 scripts/audit-live-duplication.py --allow extra-allow.txt --allow-line "문구"
  python3 scripts/audit-live-duplication.py --self-test              # offline fixture

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
# HARD CAP: MAX_ALLOWLIST entries in total — one site-wide disclaimer line and
# optionally the contact email line. Enforced at runtime (exit 1). Never add
# calculator body copy here; fix the content instead.
ALLOWLIST: list[str] = [
    "sublimernj@gmail.com",
]
MAX_ALLOWLIST = 2

MIN_LINE_CHARS = 15
LI_MIN_CHARS = 2
LI_MARK = "\x01"
QUOTE_RE = re.compile(r"「[^」]*」|\"[^\"]*\"|“[^”]*”")
DIGIT_RE = re.compile(r"\d+")
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


def _text(fragment: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", fragment))).strip()


def normalize(line: str, name: str | None) -> str:
    """Shared rule: name -> <N>, quoted span -> 「Q」, digit run -> #."""
    if name and len(name) >= 2:
        line = line.replace(name, "<N>")
    line = QUOTE_RE.sub("「Q」", line)
    line = DIGIT_RE.sub("#", line)
    return re.sub(r"\s+", " ", line).strip()


def _mark_li(m: re.Match) -> str:
    inner = m.group(1)
    if re.fullmatch(r"\s*<a\b[^>]*>.*?</a>\s*", inner, flags=re.S | re.I):
        return "\n" + inner + "\n"  # navigation link: normal floor
    return "\n" + LI_MARK + inner + "\n"


def main_lines(page_html: str) -> list[str]:
    m = re.search(r"<main\b[^>]*>(.*)</main>", page_html, flags=re.S | re.I)
    body = m.group(1) if m else ""
    body = re.sub(r"<(script|style|noscript|template|svg)\b[^>]*>.*?</\1>", " ", body, flags=re.S | re.I)
    body = re.sub(r"<!--.*?-->", " ", body, flags=re.S)
    body = re.sub(r"<li\b[^>]*>(.*?)</li>", _mark_li, body, flags=re.S | re.I)
    body = re.sub(rf"</?(?:{BLOCK_TAGS})\b[^>]*>", "\n", body, flags=re.I)
    body = re.sub(r"<[^>]+>", "", body)
    body = html.unescape(body)
    lines = []
    for raw in body.split("\n"):
        is_li = raw.lstrip().startswith(LI_MARK)
        line = re.sub(r"\s+", " ", raw.replace(LI_MARK, "")).strip()
        if len(line) >= (LI_MIN_CHARS if is_li else MIN_LINE_CHARS):
            lines.append(line)
    return lines


def parse_page(page_html: str) -> tuple[str | None, list[str]]:
    h1 = re.search(r"<h1\b[^>]*>(.*?)</h1>", page_html, flags=re.S | re.I)
    name = _text(h1.group(1)) if h1 else None
    return name, main_lines(page_html)


def find_repeats(parsed: dict[str, tuple[str | None, list[str]]], allowed: set[str]):
    """Return (exact_repeats, normalized_repeats{key: [urls]}, violations{key: [urls]})."""
    exact_pages: dict[str, set[str]] = defaultdict(set)
    norm_pages: dict[str, set[str]] = defaultdict(set)
    for u, (name, lines) in parsed.items():
        for line in set(lines):
            exact_pages[line].add(u)
            key = normalize(line, name)
            if key != "<N>":  # the page's own <h1> title is not duplicated copy
                norm_pages[key].add(u)
    exact = {line: len(us) for line, us in exact_pages.items() if len(us) >= MIN_PAGES}
    repeated = {k: sorted(us) for k, us in norm_pages.items() if len(us) >= MIN_PAGES}
    allowed_norm = {normalize(a, None) for a in allowed}
    violations = {k: us for k, us in repeated.items() if k not in allowed_norm}
    return exact, repeated, violations


SELF_TEST_PAGES = {
    f"https://fixture/tools/{slug}": (
        f"<html><body><main><h1>{name}</h1>"
        f"<p>{name} 결과는 입력 기준일이 법령 개정일과 다르면 바로 어긋납니다.</p>"
        f"<p>「{faq}」의 일반론을 {n}건 사안에 그대로 대입하면 안 됩니다.</p>"
        f"<ul><li>{name}에 넣는 금액</li><li>소정근로시간</li><li><a href=\"/x\">퇴직금 계산기</a></li></ul>"
        f"<p>{slug} 페이지만의 고유한 설명 문장입니다. 이 줄은 반복되지 않습니다.</p>"
        "</main></body></html>"
    )
    for slug, name, faq, n in [
        ("a", "퇴직금 중간정산 및 퇴직연금 계산기", "퇴직금은 언제 받나요?", 1),
        ("b", "연차수당 미사용 연차 보상 계산기", "연차는 몇 일인가요?", 2),
        ("c", "실업급여 구직급여 일액 계산기", "실업급여 조건은?", 30),
    ]
}


def self_test() -> int:
    """Fixture: 3 pages whose template lines differ only by name/quote/digits."""
    parsed = {u: parse_page(h) for u, h in SELF_TEST_PAGES.items()}
    _exact, _repeated, violations = find_repeats(parsed, set())
    expect = [
        "<N> 결과는 입력 기준일이 법령 개정일과 다르면 바로 어긋납니다.",
        "「Q」의 일반론을 #건 사안에 그대로 대입하면 안 됩니다.",
        "<N>에 넣는 금액",
        "소정근로시간",
    ]
    ok = True
    for key in expect:
        hit = key in violations
        ok &= hit
        print(f"{'PASS' if hit else 'FAIL'}  normalized repeat detected: {key}")
    leaked = [k for k in violations if "고유한" in k or "퇴직금 계산기" in k or k == "<N>"]
    ok &= not leaked
    print(f"{'PASS' if not leaked else 'FAIL'}  unique lines / link-only <li> / own <h1> not flagged {leaked or ''}")
    over = check_allowlist_cap(["a", "b", "c"])
    ok &= over is not None
    print(f"{'PASS' if over else 'FAIL'}  allowlist with 3 entries rejected")
    ok &= check_allowlist_cap(list(ALLOWLIST)) is None
    print("SELF-TEST " + ("OK" if ok else "FAILED"))
    return 0 if ok else 1


def check_allowlist_cap(allowed) -> str | None:
    if len(allowed) > MAX_ALLOWLIST:
        return (f"allowlist has {len(allowed)} entries (max {MAX_ALLOWLIST}: one disclaimer line "
                f"+ optional email line): {sorted(allowed)}")
    return None


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
    ap.add_argument("--top", type=int, default=40, help="list at most N normalized repeats (default 40)")
    ap.add_argument("--pages", type=int, default=15, help="list the N pages with the lowest unique%% (default 15)")
    ap.add_argument("--self-test", action="store_true", help="run the built-in normalization fixture and exit")
    args = ap.parse_args()
    if args.self_test:
        return self_test()

    base = (args.local or args.base).rstrip("/")
    allowed = load_allowlist(args.allow, args.allow_line)
    cap_error = check_allowlist_cap(allowed)
    if cap_error:
        print(f"FAIL: {cap_error}", file=sys.stderr)
        return 1

    try:
        urls = sitemap_urls(base)
    except Exception as exc:  # noqa: BLE001
        print(f"ERROR: cannot read sitemap at {base}/sitemap.xml: {exc}", file=sys.stderr)
        return 2

    parsed: dict[str, tuple[str | None, list[str]]] = {}
    errors: list[str] = []
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
        futs = {pool.submit(fetch, u): u for u in urls}
        for fut in as_completed(futs):
            u = futs[fut]
            try:
                parsed[u] = parse_page(fut.result())
            except Exception as exc:  # noqa: BLE001
                errors.append(f"{u}: {exc}")

    pages = {u: lines for u, (_n, lines) in parsed.items()}
    exact, repeated, violations = find_repeats(parsed, allowed)

    print(f"# base: {base}")
    print(f"# pages in sitemap: {len(urls)}, fetched: {len(pages)}, errors: {len(errors)}")
    for e in errors:
        print(f"#   fetch error: {e}")
    no_main = [u for u, lines in pages.items() if not lines]
    if no_main:
        print(f"# pages with empty <main> text: {len(no_main)}")

    print(f"\n## Exact lines repeated on >= {MIN_PAGES} pages: {len(exact)}")
    print(f"## Normalized lines (<N>=page h1, 「Q」=quote, #=digits) repeated on >= {MIN_PAGES} pages: "
          f"{len(repeated)} (not allowlisted: {len(violations)})")
    allowed_norm = {normalize(a, None) for a in allowed}
    ranked = sorted(repeated.items(), key=lambda kv: (-len(kv[1]), kv[0]))
    cap = args.top or 40
    for key, us in ranked[:cap]:
        flag = "  " if key in allowed_norm else "!!"
        shown = key if len(key) <= 100 else key[:97] + "..."
        paths = [urllib.parse.urlsplit(u).path.rsplit("/", 1)[-1] or "/" for u in us[:5]]
        more = ", ..." if len(us) > 5 else ""
        print(f"{flag} {len(us):4d}  {shown}  [{', '.join(paths)}{more}]")
    if len(ranked) > cap:
        print(f"   ... {len(ranked) - cap} more (total {len(ranked)})")

    print(f"\n## Per-page text (chars), lowest {args.pages} unique%: total / unique (normalized key "
          f"not repeated on >= {MIN_PAGES} pages) / unique%")
    rows = []
    for u, (name, lines) in parsed.items():
        total = sum(len(l) for l in lines)
        unique = sum(len(l) for l in lines if normalize(l, name) not in repeated)
        rows.append((unique / total * 100 if total else 0.0, u, total, unique))
    rows.sort()
    for pct, u, total, unique in rows[: args.pages]:
        path = urllib.parse.urlsplit(u).path or "/"
        print(f"{total:7d} {unique:7d} {pct:5.1f}%  {path}")
    if rows:
        avg = sum(r[0] for r in rows) / len(rows)
        print(f"# pages: {len(rows)}, mean unique%: {avg:.1f}%")

    if violations:
        print(f"\nFAIL: {len(violations)} normalized repeated line(s) outside the allowlist.", file=sys.stderr)
        return 1
    if errors:
        print(f"\nFAIL: {len(errors)} page(s) could not be fetched.", file=sys.stderr)
        return 1
    print("\nOK: no repeated lines outside the allowlist.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
