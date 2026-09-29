# Who Gets to Be the Expert? — evidence expansion design

## Intent and chosen approach

The reader should get a fuller, more logically sequenced editorial data story, with substantially more published data and several complementary visualization methods. The user requested expansion of the existing GitHub Pages site and previously authorized direct planning and execution. The audience remains student journalists, campus editors and Hong Kong business-news readers.

Three approaches were considered: add more purposively selected RTHK cases, redraw the existing 48 role values, or add verified final-report tables. The third adds genuinely new evidence while retaining the proposal's six-case teaching set and avoiding an unjustified Hong Kong prevalence claim. The existing 48 role values will also receive a fuller visual treatment.

## Evidence contract

- Keep the lead's strongest and narrowest finding: 2025 women were 23% of expert/commentator sources and 42% of personal-experience sources in print/radio/TV, each percentage within its own source role.
- Add `data/gmmp_visibility.csv`: 10 rounded percentages from final GMMP 2025 Table 1 (printed p. 7), corroborated by Figure 6 (p. 25). Print/radio/TV 1995–2025: 17, 18, 21, 24, 24, 25, 26; news websites 2015–2025: 25, 28, 29. This measures women among all people seen, heard or spoken about, not the expert role.
- Add `data/gmmp_topics.csv`: 46 rounded percentages from final Table 1 (printed p. 7), Figures 10–11 (p. 29). For social/legal, science/health, economy and politics/government, include all seven print/radio/TV rounds and all three website rounds. The 2025 pairs are social/legal 27/27, science/health 36/36, economy 25/27, politics/government 22/24. Add 2025-only sports 15/14 and crime/violence excluding gender-based violence 24/27 in 2020 and 21/21 in 2025. Values measure women among people in each topic and medium, not who spoke as an expert. The pre-2020 crime category was broader; its values must not be spliced into the excluding-GBV series. Earlier separate sports cells must remain absent, not fabricated.
- Add `data/gmmp_economic_subtopics_2025.csv`: two print/radio/TV 2025 values from Table 4 (printed p. 31): economic crisis/company takeovers 15%, and economic policies/markets/taxes 19%. These are selected subtopics, not a complete distribution of economic news. Show them as a reported detail and downloadable data, never pool them into the major-topic series.
- Retain the 48 final role values and all eight local person–article appearances. Derived changes and gaps use percentage points. Neither local counts nor topic visibility is numerically combined with role shares.
- Source register and data dictionary must give the exact report locator, denominator, unit and missing-value rule. The large official PDF at `/2026/04/GMMP2025-GlobalReport.pdf` remains S01.

## Reader journey

The article remains a static news-style story with a first-screen five-W lead. Its chapters move as follows:

1. **Read the source.** Define interpretation, representation and experience using GMMP role definitions and a short example.
2. **See the role split.** Present the six-role 2025 comparison, giving the 23/42 gap its direct evidence and explanation.
3. **Count the wider field.** Show overall visibility over 30 years, then 2025 topic differences. Explain why overall visibility and topic figures answer different questions from the role chart. Connect the economy topic to the choice of business-news examples without claiming local prevalence.
4. **Check persistence.** Show the observed expert trend and a complete role-by-round data grid. Explain what rose, what barely moved, and why rounded monitoring snapshots do not prove causes or statistical reversals.
5. **Look locally.** Use the existing six RTHK articles and the Jeong/Yeung counterexample to distinguish function from title or gender.
6. **Count carefully.** Add a six-person by six-article recurrence matrix before the existing eight-appearance/six-person summary. Explicitly retain U.
7. **Ask what is missing; act.** Use the two published voices, sourcing questions, practical checklist and full method/source register. Preserve the distinction between published comments and new interviews.

The sticky contents links should name the questions readers follow: Roles, Wider view, Over time, Hong Kong, Checklist and Method. Short takeaway lines and transition paragraphs should carry the argument, not merely introduce charts. Avoid generic filler and unverified causal language.

## Visualization contract

1. Existing role bars: six source roles, one medium at a time, 0–100% scale, visible values and permanent comparison table.
2. New overall visibility line chart: observed GMMP rounds only; 0–50% axis and direct end labels, with a visible data table. Website line begins in 2015.
3. New paired-dot topic plot: six selected major topics in 2025, print/radio/TV and websites on one 0–50% scale. Values and medium legend are printed beside the marks; a table is visible. Colors distinguish media, never gender.
4. Existing expert trend line: observed rounds only and no yearly interpolation.
5. New full-role grid: all 48 role values as labelled cells with in-cell bars, grouped by medium and round. The grid supplements, rather than replaces, the expert trend.
6. New local recurrence matrix: six people by six article IDs, eight marked appearances, plus role and F/M/U evidence codes; then the existing whole-number paired count chart. This is a teaching set, not a sample estimate.

Every visual has nearby scope, denominator, source and a concise reading note. All values and tables render in HTML without JavaScript. The medium switch remains progressive enhancement. At 360, 768 and 1440px there is no page-level overflow; tables may scroll within their own containers. Keyboard, reduced-motion, color contrast and print behavior remain usable.

## Delivery and checks

Modify `index.html`, `styles.css`, data files, ledger/dictionary, README and review record. Keep deployment as root files on `site-build`; no runtime fetch, external charting library, analytics or build requirement. Write tests first for new source values, chart/table parity, new navigation/sections, missing rounds, no-JavaScript content and responsive behavior. Verify the complete site locally, critically review prose and visual hierarchy, then commit, push and confirm the GitHub Pages build and public URL. The full course brief and human group activities remain outside the evidence available here.
