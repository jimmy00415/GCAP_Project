# Who Gets to Be the Expert?

A static editorial data story for GCAP3117, published at [jimmy00415.github.io/GCAP_Project](https://jimmy00415.github.io/GCAP_Project/). The full article, charts, case cards, sources and checklist are readable without JavaScript. JavaScript only switches the 2025 chart medium and shows reading progress. No build step, backend, analytics, external font or runtime data request is required.

## View locally

Open `index.html` in a browser, or serve the repository root with any static file server. `checklist.html` is the printable companion. All local links are relative so the site also works at a GitHub Pages project path such as `https://USERNAME.github.io/REPOSITORY/`.

## Verify the data and behavior

With Node.js installed:

```powershell
npm ci
npm test
```

The test suite checks all 48 final-report GMMP values, the eight local appearances and six distinct people, the no-JavaScript reading path, source links, responsive overflow, and browser interactions. Browser tests use Chrome through Playwright. If Chrome is unavailable, install a Playwright Chromium browser and change the channel in `tests/site.test.cjs`.

## Publish updates on GitHub Pages

1. Commit changes on `site-build` after running `npm test`. The working proposal PDF is deliberately ignored and will not be pushed.
2. Run `git push origin site-build`. GitHub Pages is already set to **Deploy from a branch → site-build → /(root)**.
3. Wait for GitHub's deployment status, then open the [public site](https://jimmy00415.github.io/GCAP_Project/). Check the desktop and mobile layouts, switch the medium control, open the printable checklist, and download both CSV files. The automated browser suite runs against local files; this final public-URL check confirms that Pages is serving the updated commit.

GitHub Pages is configured to publish `site-build` from `/(root)` in [jimmy00415/GCAP_Project](https://github.com/jimmy00415/GCAP_Project). GitHub Pages looks for `index.html` at the top of the selected publishing source. The `.nojekyll` file keeps these already prepared static files as-is.

## Editorial record

- `data/gmmp_roles.csv`: 48 values transcribed from Figures 16–17 of the final GMMP 2025 Global Report, not the preliminary highlights.
- `data/local_cases.csv`: eight project-coded named person–article appearances in six purposively selected 2026 RTHK reports.
- `data/sources.json`: source URLs, locators, methods and limitations.
- `data/README.md`: data dictionary and reconciliation rules.
- `docs/superpowers/specs/` and `docs/superpowers/plans/`: the build rationale and implementation plan.

The local case selection is a teaching set, not a population estimate for Hong Kong. The site does not claim original interviews, independent coding review, comprehension test results or NGO feedback. Those course activities require real group records before submission. A complete course rubric, when available, should be checked against this site and the rest of the group's submission package.
