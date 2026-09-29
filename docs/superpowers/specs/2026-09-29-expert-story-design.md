# Who Gets to Be the Expert? — static story design

## Purpose and audience

Create a publishable, source-backed web story for GCAP3117. Student journalists and campus editors should leave able to distinguish expert interpretation, institutional representation and personal experience, and to count source appearances separately from distinct people. Hong Kong business-news readers should be able to follow the same distinction without knowing the GMMP methodology in advance.

The attached proposal is the editorial starting point, not a substitute for the instructor's complete brief. The supplied rubric screenshots assess introduction (40%), structure (20%), conventions and style (20%), sources (10%) and quotes (10%). The site must make those criteria visible through its reporting, not merely repeat proposal prose.

## Story and evidence boundaries

Lead with the final GMMP 2025 values for print, radio and television news: women were 23% of expert/commentator sources and 42% of personal-experience sources. State global scope, medium, monitoring year, role denominator and 19 percentage-point gap beside the numbers. The parallel website figures are 28% and 39%, an 11-point gap. Six other roles remain accessible in a labelled 2025 comparison. A trend chart shows only the observed GMMP rounds: legacy expert values 17, 20, 19, 24, 23 (2005–2025), and website values 21, 25, 28 (2015–2025). The figures describe monitoring snapshots, not annual rates or causal changes.

Six purposively selected 2026 RTHK articles illustrate source-role decisions. They produce eight named person-article appearances, six distinct people, four specialist and four institutional appearances. The local F/M/U counts are 4/3/1 appearances and 3/2/1 people. F/M/U records explicit female or male presentation in the selected text or not established; it does not verify identity. The unknown person is Michael Fitzgerald. The six articles cannot support a Hong Kong prevalence estimate. Never pool local counts with the global percentages.

Use two published excerpts: Sarah Macharia's interpretation at the GMMP launch, as reported by WACC, and participant E36's time-pressure account in Susan Fountaine's New Zealand research. Neither is a new interview. Paraphrase RTHK reporting rather than reproduce long quotations. Attribute every case and number close to the claim. Clearly mark possible explanations as questions, not causal findings.

## Reader journey and visual direction

1. Evidence-led headline and five-W lead with the global 23%/42% finding visible before interaction.
2. Plain-language role definitions and an optional reveal exercise.
3. 2025 role comparison and observed expert trend with visible tables.
4. Six linked Hong Kong case cards, led by Hannah Jeong and Jeny Yeung as different speaking functions.
5. Paired local counts for appearances and people, including unknown.
6. Two attributed published voices and careful questions about source selection.
7. A five-part printable sourcing checklist.
8. Methods, limits, correction contact instructions, references and downloadable CSV/JSON.

Use an editorial look: warm paper, dark ink, restrained rust and teal accents, a large serif headline, plain sans-serif labels and generous spacing. Color never encodes gender. Charts use direct values, a zero baseline and textual summaries. Avoid photos because available images are illustrative file photos with unclear reuse rights and are not needed for the story.

## Technical design

Ship `index.html`, `styles.css`, `script.js`, a small `data/` directory, `README.md`, `.nojekyll` and `.gitignore` at repository root. GitHub Pages serves the root directly, without a build step or runtime dependencies. Keep the original proposal PDF untracked so a public site does not expose the working document by accident.

Pre-render the full article, tables, charts, case cards and checklist in HTML. JavaScript enhances only the 2025 medium switch and reading progress. Without JavaScript, both medium panels remain visible and all content stays readable. Use native `<details>` for the exercise and case reasoning. The table is visible regardless of selected chart medium. No tracking, forms, backend, third-party assets or mandatory network request.

Responsive targets: 360, 768 and 1440 CSS pixels. Provide semantic headings, skip link, labelled navigation, keyboard-operable control, visible focus, useful link text, sufficient contrast, reduced-motion support, textual chart descriptions and print styles. Source data is downloadable as CSV; a JSON manifest documents methods and source URLs. Relative local paths must work both at a `github.io` project path and when opened from disk.

## Verification and release boundary

Automated checks reconcile 48 GMMP values and the local eight-to-six counts, exercise the medium switch, and verify that the article remains readable with JavaScript disabled. Browser checks inspect layout at the three target widths and keyboard/print behavior. Confirm all cited article URLs and both quote sources. A final rubric audit checks lead, structure, prose, source attribution and quote handling.

The final site can be ready for GitHub Pages without being published. Publication requires the user's repository or remote and any course-specific approval. The site will not claim original interviews, independent coding, audience testing, practitioner feedback or NGO endorsement that has not occurred. The full course brief and group records may change the final submission package, but they do not block the core web story.
