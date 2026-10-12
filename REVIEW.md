# Release review — Who Gets to Be the Expert?

Updated on 13 October 2026 against the two supplied A-range rubric screenshots, the proposal and three supplied five-page interview records. The screenshots cover five weekly-assignment criteria; they are not the full course brief. This document is a self-critique and release record, not a prediction of the instructor's mark.

## Rubric critique

| Criterion | Evidence in the site | Remaining risk |
| --- | --- | --- |
| Intro (40%) | The first screen gives the 23%/42% finding, who/what/when/where, the within-role denominator, global scope and a reader-facing question. A 1440 × 900 browser check verifies both labelled values and scope note are visible without scrolling. | The instructor may prefer a different length or framing; the full brief is unavailable. |
| Structure (20%) | Lead finding → source-role definitions and comparison → overall visibility → news beats → longitudinal role data → six Hong Kong cases → recurrence and count audit → three practitioner interviews → published research and commentary → checklist → methods. Interview cards connect each account to an earlier chart/case and a reporting question. | The final submission may require separate deck/report components. |
| Conventions and style (20%) | Original short-paragraph prose, explicit percentage-point language, no annual trend interpolation, and clear separation of observation from interpretation. | Final copy should receive a human group edit for voice and house style. |
| Sources (10%) | Final GMMP report, original methodology guide, six direct RTHK reports, Fountaine's research, WACC, Internews and three project-supplied interview records. Interview source IDs I01–I03 have page/question locators and a downloadable excerpt register. | Interview dates, interviewer and mode are absent from the supplied files. Affiliations follow the records, without independent employment verification. |
| Quotes (10%) | Five short excerpts: two published quotations and one exact passage from each supplied interview. The team confirmed wording and public attribution on 13 October 2026. Anonymous Google attribution is retained; Jesseca and Wendy are named as supplied. All excerpts were compared with their source pages. | The interview records are structured Q&A documents, not supplied recordings or verbatim transcripts. Their claims remain attributed individual perspectives. |

## Data and ethical checks

- The 2025 legacy comparison uses **23%** expert/commentator and **42%** personal experience from the *final* GMMP figures. The preliminary highlights document differs on at least one value and was not used.
- Four global CSV files hold 106 rounded published percentages: 48 role, 10 overall visibility, 46 news-beat and two economic subtopic values. The site presents bars, observed-round lines, paired dots, a complete role matrix and accessible tables. The three main questions have different denominators, which are explained beside the charts and in the methods. A review caught the 2020 crime/violence excluding GBV values (24% legacy, 27% websites); both now appear in the CSV and prose, without joining them to the older broader crime category.
- Six selected RTHK reports produce eight person–article appearances and six distinct people. Four appearances are specialist commentary; four are institutional representation. F/M/U = 4/3/1 appearances and 3/2/1 people.
- Michael Fitzgerald remains U: the selected article does not explicitly establish gender presentation. The site does not infer identity from a name or photo.
- The cases are purposive examples and are never presented as a Hong Kong prevalence estimate. No cause for source selection is asserted from the published articles.
- The original proposal PDF is ignored by Git and does not ship with the public site.
- Three interview records add qualitative evidence without altering the RTHK count or GMMP data. Direct quotes are distinguished from editorial paraphrases. The originals remain local with their earlier working-record headers; only selected approved content and locators are published. The team's 13 October confirmation is not presented as an interview date.

## Interview design review

The new chapter follows the recurrence matrix, where the reader has just seen the difference between repeat appearances and distinct people. Three stacked cards give technology, finance and medicine equal space. Each pairs one concise quotation with an attributed summary, a practical reporting question and a native disclosure for further context. The medicine card links back to the topic denominator; the finance card links to the local role exercise; the technology card links to source function. This keeps the interviews part of the story's argument rather than an unrelated transcript appendix.

A separate reader-visible note records publication confirmation and missing metadata. The individual accounts motivate questions about selection and authority; they do not establish employer policy or a causal explanation for the global gender gap.

## Technical checks performed

- Static `index.html` and `checklist.html` work without a server or JavaScript; JavaScript is limited to the medium control and progress line.
- Playwright/Chrome checks cover 360, 768 and 1440 CSS pixels, keyboard medium selection, same-page anchors, focusable chart/table scroll regions, local file paths, a nested project path, and values in the visible tables.
- The interview revision passes 29 tests, including quote/register parity, anonymous attribution, chapter order and native disclosure keyboard operation with JavaScript disabled. A fresh independent reviewer checked all 15 source pages and found no Critical or Important issues. Desktop, tablet and mobile screenshots were inspected; expanded interview content also produced zero Axe WCAG A/AA violations.
- Axe checks on both pages report **zero WCAG 2/2.1 A and AA violations**. A separate test checks normal-text contrast of small case-card accents at 4.5:1 or higher.
- The printable checklist rendered as one A4 page without clipping. Its five boxes remain usable on screen and on paper.
- Earlier review corrected a moved GMMP PDF URL and a source-register layout defect at 360px. The current four global files were checked against the final report’s printed pages 7, 25, 29, 31 and 33, with exact-value automated checks. Mobile time-series charts now have a visible swipe cue and keyboard-focusable horizontal region.
- The expanded GitHub Pages build for `8cb6f23` completed. The public page returned HTTP 200 and showed the new 2020 crime comparison; the medium switch worked; all five CSV files, the checklist, source register and data dictionary returned HTTP 200. A 390px public-page check found no page-level overflow and confirmed the 700px chart scroll region.
- `npm test` is the single repeatable verification command. See the final test output at release time rather than treating this file as proof of a later run.

## Work that cannot honestly be claimed complete

The three supplied interviews have now been incorporated with the team's publication confirmation. The proposal also describes an independent second coding pass, 15–20-person comprehension check, independent practitioner or NGO review, group contribution records, a proposal deck and a written final report. No completion records for those other activities were supplied for this web revision. The site does not invent their outcomes, endorsements or scores. The complete course assignment brief was not supplied. The web story is published at [jimmy00415.github.io/GCAP_Project](https://jimmy00415.github.io/GCAP_Project/).

Before final course submission, the group should compare the full brief with the site and add only actually completed course activity records. The repository is [jimmy00415/GCAP_Project](https://github.com/jimmy00415/GCAP_Project), with `site-build` as the Pages source at `/(root)`.
