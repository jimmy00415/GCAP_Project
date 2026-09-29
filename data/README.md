# Data dictionary and coding notes

All figures and case labels used by the story are in this folder. Files are UTF-8. The CSV files have one header row and no embedded commas; dates use ISO 8601 (`YYYY-MM-DD`). The site pre-renders their values, so readers can inspect it without JavaScript or a data request.

## `gmmp_roles.csv`

One row is one published rounded percentage for a source role, news medium and monitoring round. The 48 values come from Figures 16–17 of the [final GMMP 2025 Global Report](https://whomakesthenews.org/wp-content/uploads/2026/04/GMMP2025-GlobalReport.pdf), printed page 33. The earlier highlights document is not used.

| Column | Meaning |
| --- | --- |
| `medium` | `legacy` = print, radio and television news; `website` = news websites. |
| `year` | Observed GMMP monitoring round, not an annual series. Legacy: 2005, 2010, 2015, 2020, 2025. Website: 2015, 2020, 2025. |
| `role` | One of `subject`, `spokesperson`, `expert_or_commentator`, `personal_experience`, `eye_witness`, `popular_opinion`. Definitions follow the GMMP guide, with the published subject-priority rule described in that guide. |
| `women_percent` | Women's share *within that role, medium and round*, as a rounded whole percentage in the published figure. |

The six role percentages in a year do not sum to 100% because each row has a different denominator. The report does not supply the raw role counts behind these plotted percentages. The story therefore reports no reconstructed counts, confidence intervals or significance tests. The 2025 gaps are arithmetic differences of rounded published values: legacy 42 - 23 = **19 percentage points**; websites 39 - 28 = **11 percentage points**.

## `local_cases.csv`

One row is one named speaking person in one selected article. Multiple quotations from the same person in that article count once. People only mentioned, anonymous institutional accounts, reporters and editors are excluded. These six RTHK reports were chosen purposively as examples, not randomly sampled. They cannot estimate how common women experts are in Hong Kong news.

| Column | Meaning |
| --- | --- |
| `case_id` | Stable article identifier C01–C06, linked to `sources.json`. |
| `date` | RTHK publication date in Hong Kong local time. |
| `article_title`, `article_url` | Source title and direct article link. |
| `person_id` | Stable ID for the same identified person across articles. This is how appearances are deduplicated. |
| `person`, `affiliation` | Published name and relevant organisation. An analyst's business affiliation remains visible. |
| `role` | Project speaking-function label: `specialist_commentator` or `institutional_spokesperson`. These are project interpretations, not RTHK labels. |
| `gender_presentation` | `F` = explicit female presentation, `M` = explicit male presentation, `U` = not established from selected text. These are evidence codes, not independent identity verification. `U` is not a non-binary label. |
| `gender_evidence` | Where an explicit pronoun appears in a selected report; one selected report can establish presentation for the same person in another selected report. |
| `contribution`, `rationale` | Short paraphrase of what the person contributed and why the speaking-function label was assigned. |

The local roles adapt the GMMP guide's distinction but are **not an exact replication**. In full GMMP coding, “subject” takes priority over other functions when it applies; this local exercise focuses on the function of a speaking contribution. An ambiguous case would require a written resolution rather than a forced confident label.

### Reconciliation

- Six article IDs contain eight person–article rows.
- Eddie Kwok and Jeny Yeung each have two rows, leaving six distinct `person_id` values.
- Four rows are specialist commentary and four are institutional representation.
- Presentations across rows: F/M/U = **4/3/1**.
- Presentations across distinct people: F/M/U = **3/2/1**.
- Michael Fitzgerald is U because the selected article does not explicitly establish presentation. A name, image, title or outside assumption is insufficient.

The article can reveal the quoted contribution but not the full sourcing process: whom a reporter approached, who declined, or why. No personal-experience contribution appears in these six cases. Do not pool these local rows with the global GMMP figures.

## `sources.json`

The `sources` object maps S01–S05 and C01–C06 to direct URLs, locators and intended uses. The `method` object records the denominator, local selection, unit, role adaptation, presentation rule and limits. `S06` in the proposal names a course outline that was not supplied in this folder and is therefore not presented as a public source on the site.

An independent second coding pass, audience test, practitioner feedback and any original interviews remain proposed activities. Add dated records only if they actually occur, and update the site and files together if the result changes.
