const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const failures = [];

// --- Normalization rule (shared with scripts/audit-live-duplication.py) ------
// Template sentences differ only by the calculator name, a quoted FAQ title or
// a number, so exact-string comparison misses them. Before comparing across
// tools, apply IN THIS ORDER:
//   1. the tool's own name (tools-data.ts `name:` / page <h1>)  -> <N>
//   2. /「[^」]*」|"[^"]*"|“[^”]*”/g  (quoted span)             -> 「Q」
//   3. /\d+/g                        (digit run)               -> #
// then collapse whitespace. Name goes first because names contain digits
// ("4대보험료 계산기").
const QUOTE_RE = /「[^」]*」|"[^"]*"|“[^”]*”/g;
const DIGIT_RE = /\d+/g;
const MIN_DUP_TOOLS = 3;

function normalizeForTool(text, name) {
  let t = String(text);
  if (name) t = t.split(name).join('<N>');
  return t.replace(QUOTE_RE, '「Q」').replace(DIGIT_RE, '#').replace(/\s+/g, ' ').trim();
}

function toolStrings(q) {
  return [
    ...(q.inputs || []),
    ...(q.edges || []),
    ...(q.limits || []),
    ...(q.examples || []).flatMap((ex) => [ex.title, ex.setup, ex.result]),
    q.formula,
  ].filter((t) => typeof t === 'string' && t.trim());
}

function findCrossToolDuplicates(quality, names, minTools = MIN_DUP_TOOLS) {
  const byKey = new Map();
  for (const [id, q] of Object.entries(quality)) {
    for (const text of new Set(toolStrings(q).map((t) => normalizeForTool(t, names[id])))) {
      if (!byKey.has(text)) byKey.set(text, []);
      byKey.get(text).push(id);
    }
  }
  return [...byKey.entries()]
    .filter(([, ids]) => ids.length >= minTools)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

function selfTest() {
  const fixture = {};
  const names = {};
  [['a', '퇴직금 계산기', 1], ['b', '연차수당 계산기', 2], ['c', '실업급여 계산기', 30]].forEach(([id, name, n], i) => {
    names[id] = name;
    fixture[id] = {
      formula: `${id} 고유 공식 설명 ${'가나다'.repeat(i + 1)}`,
      inputs: [`${name}에 넣는 금액`, '소정근로시간', `${id} 고유 입력`],
      edges: [`${name} 결과는 입력 기준일이 법령 개정일과 다르면 바로 어긋납니다.`, `「질문 ${id}?」의 일반론을 ${n}건 사안에 그대로 대입하면 안 됩니다.`],
      limits: [`${name} 결과는 법원·과세관청·고용센터가 인정하는 확정 금액이 아닙니다.`],
      examples: [{ title: `${name} 계산 예시 ${n}`, setup: `월 ${n * 100}만 원, ${id} 고유 조건`, result: `${id} 결과` }],
    };
  });
  const found = new Map(findCrossToolDuplicates(fixture, names));
  const expect = [
    '<N> 결과는 입력 기준일이 법령 개정일과 다르면 바로 어긋납니다.',
    '<N> 결과는 법원·과세관청·고용센터가 인정하는 확정 금액이 아닙니다.',
    '「Q」의 일반론을 #건 사안에 그대로 대입하면 안 됩니다.',
    '<N> 계산 예시 #',
    '<N>에 넣는 금액',
    '소정근로시간',
  ];
  let ok = true;
  for (const key of expect) {
    const hit = found.has(key) && found.get(key).length === 3;
    ok = ok && hit;
    console.log(`${hit ? 'PASS' : 'FAIL'}  normalized cross-tool duplicate detected: ${key}`);
  }
  const leaked = [...found.keys()].filter((k) => k.includes('고유'));
  ok = ok && leaked.length === 0;
  console.log(`${leaked.length ? 'FAIL' : 'PASS'}  tool-unique strings not flagged ${leaked.join(' | ')}`);
  console.log(`SELF-TEST ${ok ? 'OK' : 'FAILED'}`);
  process.exit(ok ? 0 : 1);
}

if (process.argv.includes('--self-test')) selfTest();

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

const data = read('src/lib/tools-data.ts');
const qualitySrc = read('src/lib/tool-quality.ts');
const layout = read('src/components/ui/CalculatorLayout.tsx');
const rootLayout = read('src/app/layout.tsx');
const privacy = read('src/app/privacy/page.tsx');
const terms = read('src/app/terms/page.tsx');
const parentalMeta = read('src/app/tools/labor/parental-leave/layout.tsx');

const toolIds = [...data.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]);
if (toolIds.length !== 55) failures.push(`expected 55 tools, found ${toolIds.length}`);

if (data.includes('<strong>4. 실무 활용 예시</strong>')) {
  failures.push('copied guide tails (section 4-6) are still in tools-data.ts');
}
if (data.includes('상한 월 150만') || data.includes('사후지급금(25%)')) {
  failures.push('stale parental-leave 150만/사후지급금 copy remains in tools-data.ts');
}
if (data.includes('2025년 최저임금은 시간급 10,030') || data.includes('코스피 0.03%') || data.includes('건강보험 3.545%')) {
  failures.push('stale 2024/2025 rate copy remains in tools-data.ts');
}
if (qualitySrc.includes('2024년 기준 코스피 0.03') || qualitySrc.includes('시간급 10,030원입니다')) {
  failures.push('stale rate copy remains in tool-quality.ts');
}
if (parentalMeta.includes('상한 월 150만') || parentalMeta.includes('사후지급금(25%)')) {
  failures.push('parental-leave metadata still describes the old 150만/25% rule');
}
const parentalPage = read('src/app/tools/labor/parental-leave/page.tsx');
if (parentalPage.includes('monthlyWage * 0.8') || parentalPage.includes('PARENTAL_RATE = 0.8')) {
  failures.push('parental-leave still applies 80% to all months; 시행령 제95조 is 100% for months 1-6');
}
if (!parentalPage.includes('month <= 6 ? 1 : 0.8')) {
  failures.push('parental-leave missing 1-6 months 100% / 7+ months 80% rate split');
}
if (data.includes('통상임금의 80%에 기간별 상한')) {
  failures.push('tools-data parental-leave longDescription still says 80% for all months');
}
const maternityMeta = read('src/app/tools/labor/maternity-leave/layout.tsx');
if (maternityMeta.includes('월 210만 원')) {
  failures.push('maternity-leave metadata still says 210만 while code uses 220만');
}
const securitiesMeta = read('src/app/tools/tax/securities-tax/layout.tsx');
if (securitiesMeta.includes('코스피 0.03%')) {
  failures.push('securities-tax metadata still uses 2024 rates');
}
if (rootLayout.includes('/og-image.png')) {
  failures.push('root layout still points OG image at missing /og-image.png');
}
if (!privacy.includes("canonical: 'https://law-calc.kr/privacy'")) {
  failures.push('privacy page is missing self-canonical');
}
if (!terms.includes("canonical: 'https://law-calc.kr/terms'")) {
  failures.push('terms page is missing self-canonical');
}
if (privacy.includes('어떠한 개인정보도 제3자에게 제공하거나 위탁하지 않습니다')) {
  failures.push('privacy still claims no third-party processing despite AdSense/Analytics');
}
if (!layout.includes('TOOL_QUALITY') || layout.includes('qualityContexts')) {
  failures.push('CalculatorLayout is not rendering per-tool quality blocks');
}

const runnable = qualitySrc
  .replace(/export interface[\s\S]*?\n}\n/g, '')
  .replace('export const TOOL_QUALITY: Record<string, ToolQuality> =', 'const TOOL_QUALITY =');
const sandbox = { TOOL_QUALITY: null };
vm.runInNewContext(`${runnable}\nthis.TOOL_QUALITY = TOOL_QUALITY;`, sandbox);
const TOOL_QUALITY = sandbox.TOOL_QUALITY;
if (!TOOL_QUALITY || typeof TOOL_QUALITY !== 'object') {
  failures.push('failed to parse TOOL_QUALITY');
}

const formulas = new Set();
for (const id of toolIds) {
  const q = TOOL_QUALITY?.[id];
  if (!q) {
    failures.push(`missing quality block for ${id}`);
    continue;
  }
  if (!q.formula || q.formula.length < 40) failures.push(`${id}: formula too short`);
  if (!Array.isArray(q.examples) || q.examples.length < 2) failures.push(`${id}: need 2 examples`);
  if ((q.examples || []).some((ex) => !ex.title || !ex.setup || !ex.result)) {
    failures.push(`${id}: incomplete example`);
  }
  if (!Array.isArray(q.sources) || q.sources.length < 1) failures.push(`${id}: missing official source`);
  if ((q.sources || []).some((s) => !/^https?:\/\//.test(s.url))) {
    failures.push(`${id}: source URL is not http(s)`);
  }
  if (!Array.isArray(q.limits) || q.limits.length < 1) failures.push(`${id}: missing limits`);
  if (!q.reviewedAt) failures.push(`${id}: missing reviewedAt`);
  if (formulas.has(q.formula)) failures.push(`${id}: formula duplicates another tool`);
  formulas.add(q.formula);
}

// --- Template-marker guardrails -------------------------------------------
// scripts/build-adsense-quality.py used to stamp the same sentence skeletons
// onto every calculator ("<name> 기본 검산", "<name>에 넣는 ...", ...). AdSense
// treats these as low-value boilerplate, so any remaining marker fails.
const TEMPLATE_MARKERS = [
  { label: 'example title "... 기본 검산"', re: / 기본 검산"/, field: (q) => (q.examples || []).map((ex) => `${ex.title}"`) },
  { label: 'example title "... 조건 변경"', re: / 조건 변경"/, field: (q) => (q.examples || []).map((ex) => `${ex.title}"`) },
  { label: 'edge "...의 일반론을 본인 사안에 그대로 대입하면 안 됩니다"', re: /의 일반론을 본인 사안에 그대로 대입하면 안 됩니다/, field: (q) => q.edges || [] },
  { label: 'input "<name>에 넣는 ..." (category-shared input list)', re: /에 넣는 /, field: (q) => q.inputs || [] },
];

// Raw-text check (independent of the vm parse) so a parse regression can't hide markers.
for (const { label, re } of TEMPLATE_MARKERS) {
  const globalRe = new RegExp(re.source, 'g');
  const hits = (qualitySrc.match(globalRe) || []).length;
  if (hits) failures.push(`template marker remains in tool-quality.ts source: ${label} x${hits}`);
}

// Per-tool breakdown so later tasks can track progress by id.
if (TOOL_QUALITY && typeof TOOL_QUALITY === 'object') {
  for (const { label, re, field } of TEMPLATE_MARKERS) {
    const ids = Object.keys(TOOL_QUALITY).filter((id) => field(TOOL_QUALITY[id]).some((text) => re.test(text)));
    if (ids.length) failures.push(`template marker "${label}": ${ids.length} tools -> ${ids.join(', ')}`);
  }

  // Worked examples must be concrete: every example setup needs at least one digit.
  const numberless = [];
  for (const [id, q] of Object.entries(TOOL_QUALITY)) {
    const bad = (q.examples || []).filter((ex) => !/\d/.test(ex.setup || '')).length;
    if (bad) numberless.push(`${id}(${bad})`);
  }
  if (numberless.length) {
    failures.push(`examples whose setup has no digit: ${numberless.length} tools -> ${numberless.join(', ')}`);
  }
}

// Generic cross-tool rule: any title/input/edge/limit/example/formula string
// that normalizes to the same key in >= MIN_DUP_TOOLS tools is template copy.
// Inputs are checked regardless of length (short shared items like
// "소정근로시간" are category boilerplate too).
if (TOOL_QUALITY && typeof TOOL_QUALITY === 'object') {
  const toolNames = Object.fromEntries(
    [...data.matchAll(/^\s+id: "([^"]+)",\s*\n\s+name: "([^"]+)"/gm)].map((m) => [m[1], m[2]]),
  );
  const unnamed = toolIds.filter((id) => !toolNames[id]);
  if (unnamed.length) failures.push(`tools-data.ts name not found for: ${unnamed.join(', ')}`);
  const dups = findCrossToolDuplicates(TOOL_QUALITY, toolNames);
  if (dups.length) {
    const LIST_CAP = 40;
    failures.push(`normalized strings repeated in >= ${MIN_DUP_TOOLS} tools: ${dups.length} (<N>=tool name, 「Q」=quote, #=digits)`);
    for (const [key, ids] of dups.slice(0, LIST_CAP)) {
      const shown = key.length > 90 ? `${key.slice(0, 87)}...` : key;
      failures.push(`  x${ids.length} ${shown}  [${ids.slice(0, 5).join(', ')}${ids.length > 5 ? ', ...' : ''}]`);
    }
    if (dups.length > LIST_CAP) failures.push(`  ... ${dups.length - LIST_CAP} more`);
  }
}

// Raw-text cross-check of the same rule, as written in the plan.
let rawNumberless = 0;
for (const m of qualitySrc.matchAll(/setup: "((?:[^"\\]|\\.)*)"/g)) {
  if (!/\d/.test(m[1])) rawNumberless += 1;
}
if (rawNumberless) failures.push(`example setups without numbers (raw source scan): ${rawNumberless}`);

if (failures.length) {
  console.error('AdSense content quality verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `AdSense content quality verification passed: ${toolIds.length} unique calculator blocks, self-canonical privacy/terms, no copied tails.`,
);
