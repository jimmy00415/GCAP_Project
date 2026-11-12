# Editorial Improvements Implementation Plan

> **For agentic workers:** Use the supplied design and complete the following tasks with behavioral verification. The user authorized autonomous implementation and publication.

**Goal:** Integrate the strongest teammate suggestions and publish the verified site on GitHub Pages.

**Architecture:** Preserve the existing static article. Enhance native HTML answers and derive the optional counting view from its evidence table.

**Tech Stack:** HTML, CSS, plain JavaScript, Node test runner, Playwright, axe, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-12-editorial-improvements-design.md`

## Global Constraints

- No dependencies or runtime requests.
- Retain all published data and interview provenance; never infer gender or reporting motives.
- All editorial content and answers must remain available without JavaScript.
- Keep charts visible, relative asset paths, reduced-motion support and the existing visual palette.

## Review Focus

- First-time readers can distinguish global statistics from local selected examples.
- Keyboard and no-JavaScript readers can obtain both answers.
- Repeated people preserve every article reference when grouped.
- Mobile and print readers retain legible evidence and useful controls.
- Existing anonymous attribution, unknown codes and data denominators remain accurate.

### Task 1: Source-linked local opening and exercise

**Files:** `index.html`, `styles.css`, `script.js`, `tests/site.test.cjs`.

- [x] Write browser tests for the static opening, wrong/correct responses, retry and no-JavaScript answers; run to observe missing-feature failures.
- [x] Replace hero lead, add two unified example/exercise cards and start navigation; retain scoped global figures.
- [x] Enhance the static answer disclosures with choice feedback and keyboard-accessible buttons.

### Task 2: Explain repeated appearances through grouping

**Files:** `index.html`, `styles.css`, `script.js`, `tests/site.test.cjs`.

- [x] Write and run tests for eight appearances, six grouped people, stable person IDs, eight retained article links and reversible keyboard operation.
- [x] Derive cards from the existing recurrence matrix; preserve the matrix and F/M/U tables.
- [x] Add stable case anchors and refresh reading progress on layout changes.

### Task 3: Review and publish

**Files:** `README.md`, editorial date in `index.html`, documentation above.

- [x] Record judgment on the suggestions and the actual revision date.
- [x] Run `npm test`, inspect desktop/mobile/print and interactive accessibility, request independent review, resolve material findings, and run `git diff --check`.

Publication procedure: commit explicit intended files on `site-build`, push, wait for the Pages deployment of the new commit, and verify the public URL and assets before returning the final link.

## Verification record

- Five targeted new-feature tests first failed for the missing local lead/exercises/count control, then passed after implementation.
- An additional narrow-screen axe check reproduced an existing unfocusable source-role table. Adding the same focusable-region semantics as the other evidence tables resolved it; a regression also verifies horizontal scrolling with ArrowRight.
- `npm test`: 34 passed, zero failures. Includes data fidelity, keyboard retry/grouping, no-JavaScript reading, reduced motion, nested project paths, desktop/mobile overflow, and desktop/expanded-mobile accessibility checks.
- Independent review found no material defects. Corrected its two stale exercise references.
- Browser probes confirmed printed answers with JavaScript on/off, all eight grouped source links, working case anchors, and 320/390 px layouts without overflow.
