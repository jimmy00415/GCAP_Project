# Editorial improvements — 12 November 2026

The user supplied `D:\VS_Project\GCAP_Real_Website_Improvements`, delegated editorial and design judgment, and requested implementation and GitHub Pages publication.

## Intent and constraints

Make the source-role distinction tangible before the global evidence, and make the difference between appearances and people easier to explore. Preserve the existing editorial palette, static HTML delivery, all published data, source links, anonymous interview attribution and provenance. Add no dependencies or runtime requests. All editorial content and answers must remain available without JavaScript.

## Approaches considered

- Copy the proposed drop-in script and stylesheet: quick, but rewrites the story only after JavaScript runs, duplicates example content and hard-codes a second case dataset. Rejected.
- Integrate a compact version into the canonical HTML/CSS/JS: selected under the user's delegated judgment. Two source-linked local cards double as the reading exercise. The counting interaction derives from the existing recurrence matrix.
- Fold three global sections into a closed disclosure: reduces scrolling, but conceals core infographics and complicates deep links, print and reading progress. Keep charts visible and add a direct route to the local reports instead.

## Behavior

1. Open with Hannah Jeong's wider redevelopment interpretation and Jeny Yeung's contribution about MTR's affairs. Avoid asserting what reporters asked or why. Keep 23%/42%, 2025 global scope, within-role denominator, medium and GMMP citation adjacent to the figures.
2. Add `#hong-kong-opening` before `#evidence`. Each `.reading-card` contains one paraphrased scenario, three choice buttons and a native answer disclosure. Without JavaScript, the disclosure works normally and choice buttons are hidden. With JavaScript, selecting a choice reveals neutral explanatory feedback and the answer. Retrying is allowed; pressed state tracks the selected choice.
3. Add `#count-visual`, initialized from `.recurrence-matrix` rows and marked appearance cells. Default to eight appearance cards. `#count-unique` groups them into six cards while retaining all eight article links. Toggling back restores eight. Keep the full matrix and all F/M/U counts visible and unchanged.
4. Link generated article references to stable `#case-C01` through `#case-C06` targets. Update editorial revision date to 12 November 2026. Document accepted/adapted/rejected suggestions in README.

## Verification and delivery

Extend browser tests for both exercise outcomes, keyboard retry, no-JavaScript answers, 8-to-6 grouping, retained article links and matrix data. Retain the existing data, first-screen scope, mobile overflow, nested-path and accessibility checks. Inspect desktop/mobile screenshots and print behavior. Request an independent code review, run `npm test` and `git diff --check`, commit only intended files on `site-build`, push, and verify both the GitHub Pages deployment commit and live interactions.

The suggestion package provides no new verified interview consent, reporting events or course requirements; do not add such claims.
