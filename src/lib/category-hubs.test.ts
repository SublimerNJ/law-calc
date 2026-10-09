import { describe, expect, it } from 'vitest';
import { CATEGORIES, getToolsByCategory } from './tools-data';
import { CATEGORY_HUBS, getCategoryHub } from './category-hubs';

describe('category hub content', () => {
  it('has a directly written hub and selection notes for every category tool', () => {
    expect(Object.keys(CATEGORY_HUBS).sort()).toEqual(CATEGORIES.map(({ id }) => id).sort());

    for (const category of CATEGORIES) {
      const hub = getCategoryHub(category.id);
      const tools = getToolsByCategory(category.id);

      expect(hub).toBeDefined();
      expect(hub?.title).toBeTruthy();
      expect(hub?.intro).toBeTruthy();
      expect(hub?.selectionHeading).toBeTruthy();
      expect(hub?.selectionIntro).toBeTruthy();
      expect(Object.keys(hub?.toolNotes ?? {}).sort()).toEqual(tools.map(({ id }) => id).sort());
      expect(new Set(Object.values(hub?.toolNotes ?? {})).size).toBe(tools.length);
    }
  });

  it('does not silently resolve an unknown category', () => {
    expect(getCategoryHub('unknown')).toBeUndefined();
  });
});
