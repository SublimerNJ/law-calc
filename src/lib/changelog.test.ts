import { describe, expect, it } from 'vitest';
import { CHANGELOG_ENTRIES, CHANGELOG_LAST_MODIFIED, getChangelogEntry } from './changelog';

const EXPECTED_COMMITS = [
  'ce07e9e',
  '2972124',
  '5f3b281',
  '32f87c1',
  '674ea16',
  'fc49c07',
  '3fdddc1',
  '8d279c7',
  '1c9ee88',
  '237ba24',
  'faf809e',
  'be59429',
  '0cb45be',
  'faac73b',
  'bddd90c',
  'dcc843d',
  '7d67a06',
];

describe('changelog records', () => {
  it('keeps the reviewed changes in reverse chronological order with their real commits', () => {
    expect(CHANGELOG_ENTRIES.map((entry) => entry.commit)).toEqual(EXPECTED_COMMITS);
    expect(CHANGELOG_LAST_MODIFIED).toBe('2026-10-14');

    for (const entry of CHANGELOG_ENTRIES) {
      expect(entry.date).toMatch(/^2026-\d{2}-\d{2}$/);
      expect(entry.title).toBeTruthy();
      expect(entry.summary).toBeTruthy();
      expect(entry.changes.length).toBeGreaterThan(0);
      expect(entry.commitUrl).toBe(`https://github.com/SublimerNJ/law-calc/commit/${entry.commit}`);
      expect(entry.sources.length).toBeGreaterThan(0);
    }

    expect(CHANGELOG_ENTRIES.map((entry) => entry.date)).toEqual(
      [...CHANGELOG_ENTRIES].map((entry) => entry.date).sort().reverse(),
    );
  });

  it('records the parental-leave rate correction instead of a generic update', () => {
    const entry = getChangelogEntry('7d67a06');

    expect(entry?.summary).toContain('1~6개월');
    expect(entry?.summary).toContain('100%');
    expect(entry?.summary).toContain('7개월부터 80%');
    expect(entry?.changes.join(' ')).toContain('250만');
    expect(entry?.changes.join(' ')).toContain('제95조');
  });

  it('records the verified numerical and scope changes from Phase A', () => {
    expect(getChangelogEntry('bddd90c')?.changes.join(' ')).toContain('기준금리 연 3.00%');
    expect(getChangelogEntry('bddd90c')?.changes.join(' ')).toContain('4.5배');
    expect(getChangelogEntry('faac73b')?.changes.join(' ')).toContain('621,000원');
    expect(getChangelogEntry('3fdddc1')?.changes.join(' ')).toContain('자료로 확인된 재산상 손해');
    expect(getChangelogEntry('faf809e')?.changes.join(' ')).toContain('보석금 입력·출력');
  });

  it('does not resolve a commit that is not in the published record', () => {
    expect(getChangelogEntry('unknown')).toBeUndefined();
  });
});
