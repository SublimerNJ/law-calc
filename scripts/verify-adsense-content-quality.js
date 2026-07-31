const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const layoutPath = path.join(root, 'src/components/ui/CalculatorLayout.tsx');
const dataPath = path.join(root, 'src/lib/tools-data.ts');
const layout = fs.readFileSync(layoutPath, 'utf8');
const data = fs.readFileSync(dataPath, 'utf8');

const failures = [];
const guideCount = (data.match(/extendedGuide:\s*`/g) || []).length;
if (guideCount !== 55) {
  failures.push(`expected 55 calculator guides, found ${guideCount}`);
}

const repetitiveMarker = '<strong>4. 실무 활용 예시</strong>';
if (data.includes(repetitiveMarker) && !layout.includes(`split('${repetitiveMarker}')`)) {
  failures.push('generic sections 4-6 are still rendered, including mismatched calculator descriptions');
}

for (const required of ['입력값 검증', '계산 기준', '실무 활용 맥락']) {
  if (!layout.includes(required)) failures.push(`missing calculator-specific quality section: ${required}`);
}

if (failures.length) {
  console.error('AdSense content quality verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`AdSense content quality verification passed: ${guideCount} calculator guides protected from generic sections.`);
