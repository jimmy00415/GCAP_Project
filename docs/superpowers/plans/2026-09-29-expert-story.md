# Expert Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a source-backed, accessible editorial data story ready for branch-root GitHub Pages deployment.

**Architecture:** HTML pre-renders all essential reporting and chart fallbacks. A small script progressively enhances the 2025 medium control. Source CSVs and a JSON manifest make the calculations and citations auditable without a runtime request.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript; Node's built-in test runner and Playwright/Chrome for local verification only.

**Spec:** `docs/superpowers/specs/2026-09-29-expert-story-design.md`

## Global Constraints

- No backend, build step, paid API, external runtime asset or analytics.
- Global GMMP percentages and six purposive Hong Kong cases remain separate evidence layers.
- Default 2025 chart medium is print/radio/television; the table and entire article work without JavaScript.
- Local case counts are appearances F/M/U = 4/3/1 and distinct people = 3/2/1, with U labelled not established from selected text.
- No claim of completed interview, second coding, comprehension test, practitioner review or NGO feedback.
- The proposal PDF stays outside version control.

## Review Focus

- A visitor on a project URL containing a repository path should load every local asset; browser test opens the site under a nested path.
- A visitor without JavaScript should see both 2025 chart panels and all essential prose; browser test disables JavaScript.
- A keyboard user should operate the medium switch and read meaningful focus state; browser test presses Tab/Enter.
- An unknown gender presentation should remain explicit when counts change; data and browser tests assert the U value and label.
- A small-screen visitor should have no horizontal page overflow at 360px; browser test checks scroll width.

---

### Task 1: Source tables and reconciliation

**Files:** Create `data/gmmp_roles.csv`, `data/local_cases.csv`, `data/sources.json`, `tests/data.test.cjs`, `package.json`, `.gitignore`.

**Interfaces:** CSV headers in tests are the contract for the article. `gmmp_roles.csv`: `medium,year,role,women_percent`. `local_cases.csv`: `case_id,date,article_title,article_url,person_id,person,affiliation,role,gender_presentation,gender_evidence,contribution,rationale`.

- [ ] Write data tests using literal expected values from the final GMMP Figures 16–17 and proposal's eight local records.
- [ ] Run `npm test` and confirm failure because the datasets are absent.
- [ ] Create the CSVs and JSON manifest, with all six working RTHK URLs and primary-source URLs.
- [ ] Run `npm test` and confirm data checks pass.
- [ ] Commit the source tables and tests.

### Task 2: Article, charts and citations

**Files:** Create `index.html`, `styles.css`, `tests/site.test.cjs`.

**Interfaces:** HTML supplies `#role-legacy`, `#role-web`, `[data-medium-button]`, `#comparison-context`, `#reading-progress`, case links and visible source tables. Task 3 enhances those elements without changing the article's truth.

- [ ] Write browser tests for the lead's scope/values, three charts/tables, six cases, two attributed excerpts, no-JS reading and narrow-width layout.
- [ ] Run `npm test` and confirm expected failure because the site files are absent.
- [ ] Write the original 1,000–1,300-word editorial story and fully pre-rendered charts, cases, methods, data downloads and references.
- [ ] Style responsive, print and focus states at 360/768/1440px.
- [ ] Run `npm test` and resolve failures.
- [ ] Commit the article and layout.

### Task 3: Progressive interaction and publishing guide

**Files:** Create `script.js`, `README.md`, `.nojekyll`; update `tests/site.test.cjs`.

**Interfaces:** `script.js` toggles the two role panels, controls `aria-pressed`, updates `#comparison-context`, and updates `#reading-progress`. It makes no fetch request.

- [ ] Add browser tests for medium switch by click and keyboard, its context text, fallback with JavaScript disabled, nested-path loading and progress behavior.
- [ ] Run `npm test` and confirm the new interaction tests fail for missing behavior.
- [ ] Implement the small enhancement and deployment instructions.
- [ ] Run the full suite and confirm it passes.
- [ ] Commit the enhancement and guide.

### Task 4: Editorial and release verification

**Files:** Update site/data/tests only for identified errors; add `REVIEW.md` documenting the rubric audit and unresolved external course tasks.

**Interfaces:** No new public API. Site remains runnable by opening `index.html` or serving repository root.

- [ ] Reconcile site copy and all tables against the verified source register, including final rather than preliminary GMMP values.
- [ ] Inspect desktop, tablet, mobile, no-JS and print output in a real browser; record and fix concrete defects with failing regression tests where behavior changes.
- [ ] Run the full automated suite, validate local links and run a self-critique against every A-range rubric category.
- [ ] Request one fresh whole-site review; fix Critical/Important findings and rerun tests.
- [ ] Commit the release audit; report the exact GitHub Pages setup and any remaining external requirements.
