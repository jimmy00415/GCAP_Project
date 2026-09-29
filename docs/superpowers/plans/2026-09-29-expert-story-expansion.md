# Evidence-rich story expansion implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the published data story with source-checked visibility/topic datasets, complementary visualizations and a clearer evidence-to-action narrative.

**Architecture:** Keep pre-rendered static HTML and CSS at repository root. Add three CSV files and source metadata; author visual forms directly in HTML so every chart works without JavaScript. Existing `script.js` continues to enhance only the medium switch and progress line.

**Tech Stack:** HTML, CSS, small vanilla JavaScript, Node test runner, Playwright/Chrome, GitHub Pages branch deployment.

**Spec:** `docs/superpowers/specs/2026-09-29-expert-story-expansion-design.md`

## Global Constraints

- Preserve the proposal's six purposively selected local cases and the 23%/42% global lead.
- Use final GMMP Table 1/4 and Figures 6/10/11/16/17 with exact denominators; no invented missing years or Hong Kong estimates.
- No required JavaScript, runtime network request, chart library or build step.
- Publish from `site-build` at `/(root)`; retain relative paths and `.nojekyll`.

## Review Focus

- The 1995–2025 visibility series and 2015–2025 website series have different starts; test that the chart and table do not create pre-2015 website values.
- Topic visibility is not expert-role share; test each chart's explanatory denominator and source locator.
- Sports and non-GBV crime have only 2025 rows; test that absent historical values are never shown as zero.
- The 48-value role grid can drift from the CSV; test every visible cell against its data row.
- Extra sections can break sticky navigation and narrow layouts; test links, scroll position and 360/768/1440 overflow.

---

### Task 1: Publish the expanded evidence tables

**Files:** Create `data/gmmp_visibility.csv`, `data/gmmp_topics.csv`, `data/gmmp_economic_subtopics_2025.csv`; modify `data/README.md`, `data/sources.json`, `tests/data.test.cjs`.

**Interfaces:** CSV columns `medium,year,women_percent` for visibility; `medium,year,topic,women_percent` for topics; `topic,women_percent` for economic subtopics. The existing S01 source ID covers all global tables.

- [ ] Add tests for 10 visibility rows, all exact values and missing website years.
- [ ] Add tests for 44 topic rows, six 2025 topic pairs, four complete historical series, absent earlier sports/crime cells and two economic subtopics.
- [ ] Run data tests to confirm RED from absent files.
- [ ] Create the CSVs, locators and denominator/missingness definitions; run data tests to GREEN.
- [ ] Commit the verified data package.

### Task 2: Rebuild the article's evidence arc

**Files:** Modify `index.html`, `styles.css`, `tests/site.test.cjs`.

**Interfaces:** Preserve `#intro`, `#evidence`, `#cases`, `#voices`, `#checklist`, `#method`; add `#visibility` and `#trend` for navigation. Existing medium controls keep their data attributes.

- [ ] Test the six-link contents, new section headings, visibility/topic/expert denominators, source citations and three new download links; confirm RED.
- [ ] Restructure the chapter order and write evidence-led transitions and takeaways with exact source limits.
- [ ] Add the overall visibility SVG chart and table, plus paired-dot 2025 topic plot and table; confirm tests GREEN.
- [ ] Add visual checks for direct values, zero baselines, distinct medium legend and 360/768/1440 layouts.
- [ ] Commit the narrative and new published-data visuals.

### Task 3: Make the longitudinal and local evidence explorable

**Files:** Modify `index.html`, `styles.css`, `tests/site.test.cjs`.

**Interfaces:** The full-role grid exposes `data-medium`, `data-year`, `data-role`, `data-value` on each value cell; the local recurrence matrix exposes article/person IDs in table headers and `data-present` on its eight marked cells.

- [ ] Test that all 48 role cells match `gmmp_roles.csv`, both media are visible with JavaScript disabled, and the recurrence matrix has exactly eight marks across six people; confirm RED.
- [ ] Add the full-role grid and recurrence matrix with nearby reading notes and visible table semantics; confirm tests GREEN.
- [ ] Review the six-case scope warning, U explanation and role-affiliation labels alongside the new visual forms.
- [ ] Commit the longitudinal and local visualizations.

### Task 4: Release review and deployment

**Files:** Modify `README.md`, `REVIEW.md`, possibly `index.html`/`styles.css` only for verified defects; tests as needed.

- [ ] Run `npm test`, inspect 360/768/1440 screenshots, no-JavaScript view, keyboard controls, print checklist and Axe output.
- [ ] Review the entire article for a single clear claim per chapter, source accuracy, spelling, quote handling and visual redundancy. Fix defects with failing regression tests when behavior changes.
- [ ] Update release notes and data inventory. Run `git diff --check`, commit and push `site-build`.
- [ ] Confirm the latest Pages build SHA and check the public URL, assets, chart interaction, downloads and mobile overflow.
