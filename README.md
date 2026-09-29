# Who Gets to Be the Expert?

A static editorial data story for GCAP3117, built for GitHub Pages. The full article, charts, case cards, sources and checklist are readable without JavaScript. JavaScript only switches the 2025 chart medium and shows reading progress. No build step, backend, analytics, external font or runtime data request is required.

## View locally

Open `index.html` in a browser, or serve the repository root with any static file server. `checklist.html` is the printable companion. All local links are relative so the site also works at a GitHub Pages project path such as `https://USERNAME.github.io/REPOSITORY/`.

## Verify the data and behavior

With Node.js installed:

```powershell
npm ci
npm test
```

The test suite checks all 48 final-report GMMP values, the eight local appearances and six distinct people, the no-JavaScript reading path, source links, responsive overflow, and browser interactions. Browser tests use Chrome through Playwright. If Chrome is unavailable, install a Playwright Chromium browser and change the channel in `tests/site.test.cjs`.

## Publish on GitHub Pages

1. Create an empty GitHub repository. For a personal root site, name it `USERNAME.github.io`; for a project site, any repository name works.
2. Push this repository's `site-build` branch to GitHub. The working proposal PDF is deliberately ignored and will not be pushed.
3. In repository **Settings → Pages**, choose **Deploy from a branch**, select `site-build`, and select `/(root)`.
4. Wait for GitHub's deployment status, then open the displayed Pages URL. Re-run the browser checks against that URL if its final path differs from local testing.

GitHub Pages looks for `index.html` at the top of the selected publishing source. The `.nojekyll` file keeps these already prepared static files as-is. No remote is configured in this local folder, so publishing requires the owner's repository URL and push access.

## Editorial record

- `data/gmmp_roles.csv`: 48 values transcribed from Figures 16–17 of the final GMMP 2025 Global Report, not the preliminary highlights.
- `data/local_cases.csv`: eight project-coded named person–article appearances in six purposively selected 2026 RTHK reports.
- `data/sources.json`: source URLs, locators, methods and limitations.
- `data/README.md`: data dictionary and reconciliation rules.
- `docs/superpowers/specs/` and `docs/superpowers/plans/`: the build rationale and implementation plan.

The local case selection is a teaching set, not a population estimate for Hong Kong. The site does not claim original interviews, independent coding review, comprehension test results or NGO feedback. Those course activities require real group records before submission. A complete course rubric, when available, should be checked against this site and the rest of the group's submission package.
