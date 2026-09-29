# Release review — Who Gets to Be the Expert?

Reviewed on 29 September 2026 against the two supplied A-range rubric screenshots and the 11-page proposal. The screenshots cover five weekly-assignment criteria; they are not the full course brief. This document is a self-critique and release record, not a prediction of the instructor's mark.

## Rubric critique

| Criterion | Evidence in the site | Remaining risk |
| --- | --- | --- |
| Intro (40%) | The first screen gives the 23%/42% finding, who/what/when/where, the within-role denominator, global scope and a reader-facing question. A 1440 × 900 browser check verifies both labelled values and scope note are visible without scrolling. | The instructor may prefer a different length or framing; the full brief is unavailable. |
| Structure (20%) | Lead finding → source-role definitions and comparison → overall visibility → news beats → longitudinal role data → six Hong Kong cases → recurrence and count audit → published voices → checklist → methods. Contents links and chart-specific takeaway text guide the sequence. | The final submission may require separate deck/report components. |
| Conventions and style (20%) | Original short-paragraph prose, explicit percentage-point language, no annual trend interpolation, and clear separation of observation from interpretation. | Final copy should receive a human group edit for voice and house style. |
| Sources (10%) | Table 1, Figure 6, Figures 10–11 and 16–17, and Table 4 of the final GMMP report; original methodology guide; six direct RTHK reports; Fountaine's research; WACC's report of Macharia's remarks; Internews practice resource. Inline citations, a source register and CSV/JSON downloads are visible. | Sources can move after release. A group member should re-open each link at final submission and document any access change. |
| Quotes (10%) | Two short excerpts are identified with speaker, original setting, publication and link. The WACC remark is framed as interpretation; E36's words are labelled as a New Zealand research interview. | Neither quotation represents a new project interview; any course requirement for original reporting needs actual fieldwork. |

## Data and ethical checks

- The 2025 legacy comparison uses **23%** expert/commentator and **42%** personal experience from the *final* GMMP figures. The preliminary highlights document differs on at least one value and was not used.
- Four global CSV files hold 106 rounded published percentages: 48 role, 10 overall visibility, 46 news-beat and two economic subtopic values. The site presents bars, observed-round lines, paired dots, a complete role matrix and accessible tables. The three main questions have different denominators, which are explained beside the charts and in the methods. A review caught the 2020 crime/violence excluding GBV values (24% legacy, 27% websites); both now appear in the CSV and prose, without joining them to the older broader crime category.
- Six selected RTHK reports produce eight person–article appearances and six distinct people. Four appearances are specialist commentary; four are institutional representation. F/M/U = 4/3/1 appearances and 3/2/1 people.
- Michael Fitzgerald remains U: the selected article does not explicitly establish gender presentation. The site does not infer identity from a name or photo.
- The cases are purposive examples and are never presented as a Hong Kong prevalence estimate. No cause for source selection is asserted from the published articles.
- The original proposal PDF is ignored by Git and does not ship with the public site.

## Technical checks performed

- Static `index.html` and `checklist.html` work without a server or JavaScript; JavaScript is limited to the medium control and progress line.
- Playwright/Chrome checks cover 360, 768 and 1440 CSS pixels, keyboard medium selection, same-page anchors, focusable chart/table scroll regions, local file paths, a nested project path, and values in the visible tables.
- Axe checks on both pages report **zero WCAG 2/2.1 A and AA violations**. A separate test checks normal-text contrast of small case-card accents at 4.5:1 or higher.
- The printable checklist rendered as one A4 page without clipping. Its five boxes remain usable on screen and on paper.
- Earlier review corrected a moved GMMP PDF URL and a source-register layout defect at 360px. The current four global files were checked against the final report’s printed pages 7, 25, 29, 31 and 33, with exact-value automated checks. Mobile time-series charts now have a visible swipe cue and keyboard-focusable horizontal region.
- The expanded GitHub Pages build for `8cb6f23` completed. The public page returned HTTP 200 and showed the new 2020 crime comparison; the medium switch worked; all five CSV files, the checklist, source register and data dictionary returned HTTP 200. A 390px public-page check found no page-level overflow and confirmed the 700px chart scroll region.
- `npm test` is the single repeatable verification command. See the final test output at release time rather than treating this file as proof of a later run.

## Work that cannot honestly be claimed complete

The proposal describes an independent second coding pass, 15–20-person comprehension check, practitioner or NGO review, possible original interviews, group contribution records, a proposal deck and a written final report. No evidence of completed work for these activities was supplied. The site labels relevant items as proposed and does not invent outcomes, participant names, endorsement or scores. The complete course assignment brief was not supplied. The web story is published at [jimmy00415.github.io/GCAP_Project](https://jimmy00415.github.io/GCAP_Project/).

Before final course submission, the group should compare the full brief with the site and add only actually completed course activity records. The repository is [jimmy00415/GCAP_Project](https://github.com/jimmy00415/GCAP_Project), with `site-build` as the Pages source at `/(root)`.
