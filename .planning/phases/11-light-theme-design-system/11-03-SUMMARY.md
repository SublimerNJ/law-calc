---
phase: 11
plan: 03
subsystem: design-system
tags: [light-theme, tailwind, script]
requires: [11-02]
provides: [light-theme-tools]
affects: [src/app/tools/]
tech-stack:
  added: [node-script]
  patterns: [regex-replacement, automated-refactoring]
key-files:
  created: [scripts/migrate-theme.js]
  modified: [src/app/tools/**/*.tsx]
key-decisions:
  - Button text colors were kept white when inside colored background containers to maintain contrast.
metrics:
  duration: 10m
  completed_date: 2026-03-23
---

# Phase 11 Plan 03: Calculators UI Migration Summary

Successfully migrated 70 calculator tools to the new light theme using an automated Node.js script, resolving visual issues caused by hardcoded dark theme classes.

## Objectives Achieved

- Created `scripts/migrate-theme.js` to batch process 70+ files.
- Replaced dark theme Tailwind classes (e.g., `bg-[#0d1424]`, `text-white`) with light theme equivalents (e.g., `bg-white`, `text-slate-900`).
- Implemented smart reverts in the script to keep primary buttons readable (white text on colored backgrounds).
- Verified changes successfully via Next.js Turbopack build without any TypeScript or syntax errors.

## Execution Details

1.  **Task 1 & 2: Theme Migration Script and Build Fixes**
    - Wrote a Node.js script using regex to replace specific hardcoded Tailwind classes.
    - Executed script on `src/app/tools/**/*.tsx` modifying 71 files.
    - Build passed without issues.
    - Commit: `7ce5409`

## Deviations from Plan

- **None:** The plan executed exactly as written.

## Known Stubs

- **None:** No stubs exist.

## Self-Check: PASSED
- `scripts/migrate-theme.js` exists.
- `src/app/tools` files have been modified.
- Commit `7ce5409` exists.