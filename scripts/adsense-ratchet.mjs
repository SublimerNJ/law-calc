#!/usr/bin/env node
/*
 * AdSense quality ratchet.
 *
 * Runs the two duplication guardrails and compares their counts with the
 * committed baseline (docs/adsense/ratchet.json). A count may go down or stay
 * the same; it may never go up. This lets the site improve one calculator per
 * day while the full guardrails are still RED, and blocks any change that
 * adds templated copy.
 *
 * Usage:
 *   node scripts/adsense-ratchet.mjs            # source check only
 *   node scripts/adsense-ratchet.mjs --local    # + build output served on :3456
 *   node scripts/adsense-ratchet.mjs --live     # + https://law-calc.kr
 *   add --update to write the new (lower or equal) counts to the baseline.
 *
 * Exit: 0 = no metric increased, 1 = a metric increased or a check crashed.
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baselinePath = path.join(root, 'docs/adsense/ratchet.json');
const args = new Set(process.argv.slice(2));
const PORT = 3456;

function sourceMetrics() {
  const r = spawnSync('node', ['scripts/verify-adsense-content-quality.js'], { cwd: root, encoding: 'utf8' });
  const out = `${r.stdout}\n${r.stderr}`;
  if (r.status === 0) return { sourceNormalizedRepeats: 0, sourceExamplesWithoutDigits: 0, sourceMarkerHits: 0, sourceOtherFailures: 0 };
  const num = (re) => { const m = out.match(re); return m ? Number(m[1]) : 0; };
  const markerHits = [...out.matchAll(/template marker remains in tool-quality\.ts source: .* x(\d+)/g)]
    .reduce((s, m) => s + Number(m[1]), 0);
  const known = /template marker|examples whose setup|normalized strings repeated|example setups without numbers|^-\s{3}|^-\s+\.\.\. \d+ more/;
  const other = out.split('\n').filter((l) => l.startsWith('- ') && !known.test(l)).length;
  return {
    sourceNormalizedRepeats: num(/normalized strings repeated in >= 3 tools: (\d+)/),
    sourceExamplesWithoutDigits: num(/example setups without numbers \(raw source scan\): (\d+)/),
    sourceMarkerHits: markerHits,
    sourceOtherFailures: other,
  };
}

function liveMetrics(base, local) {
  const cli = ['scripts/audit-live-duplication.py'];
  if (local) cli.push('--local', base, 'https://law-calc.kr'); else cli.push(base);
  const r = spawnSync('python3', cli, { cwd: root, encoding: 'utf8', timeout: 300_000 });
  const out = `${r.stdout}\n${r.stderr}`;
  const m = out.match(/Normalized lines .* repeated on >= \d+ pages: (\d+) \(not allowlisted: (\d+)\)/);
  const f = out.match(/pages in sitemap: (\d+), fetched: (\d+), errors: (\d+)/);
  if (!m || !f) throw new Error(`live audit output not understood (exit ${r.status}):\n${out.slice(0, 1500)}`);
  if (Number(f[3]) > 0) throw new Error(`live audit fetch errors: ${f[0]}`);
  return { [`${local ? 'local' : 'live'}NormalizedRepeats`]: Number(m[2]), [`${local ? 'local' : 'live'}Pages`]: Number(f[2]) };
}

async function withLocalServer(fn) {
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], { cwd: root, stdio: 'ignore', detached: true });
  try {
    for (let i = 0; i < 60; i++) {
      try { const res = await fetch(`http://localhost:${PORT}/sitemap.xml`); if (res.ok) break; } catch {}
      await new Promise((r) => setTimeout(r, 1000));
    }
    return fn(`http://localhost:${PORT}`);
  } finally {
    try { process.kill(-server.pid); } catch {}
  }
}

const current = sourceMetrics();
try {
  if (args.has('--local')) Object.assign(current, await withLocalServer((b) => liveMetrics(b, true)));
  if (args.has('--live')) Object.assign(current, liveMetrics('https://law-calc.kr', false));
} catch (e) {
  console.error(`ratchet: ${e.message}`);
  process.exit(1);
}

const baseline = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : {};
const worse = [];
for (const [k, v] of Object.entries(current)) {
  if (k.endsWith('Pages')) continue;
  if (k in baseline && v > baseline[k]) worse.push(`${k}: ${baseline[k]} -> ${v}`);
}
console.log(JSON.stringify({ baseline, current }, null, 2));
if (worse.length) {
  console.error(`ratchet FAILED (metric increased):\n  ${worse.join('\n  ')}`);
  process.exit(1);
}
if (args.has('--update')) {
  const next = { ...baseline };
  for (const [k, v] of Object.entries(current)) if (!k.endsWith('Pages')) next[k] = v;
  next.updatedAt = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
  fs.writeFileSync(baselinePath, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`ratchet baseline updated: ${path.relative(root, baselinePath)}`);
}
console.log('ratchet OK (no metric increased)');
