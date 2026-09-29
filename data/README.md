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

## `gmmp_visibility.csv`

Ten rounded values from the final report's Table 1 (printed p. 7), also presented in Figure 6 (p. 25). One row is women's share among **all people seen, heard or spoken about** in the specified medium and monitoring round. This is a different denominator from the role table. Legacy has seven observed rounds from 1995 to 2025; website monitoring has three from 2015 to 2025. No website values exist in this series before 2015. The 1995–2025 legacy difference is 26 - 17 = **9 percentage points**; it is not an annualized rate or a test of statistical significance.

| Column | Meaning |
| --- | --- |
| `medium` | `legacy` = newspapers, radio and television; `website` = news websites. |
| `year` | Published GMMP monitoring round, not an annual observation. |
| `women_percent` | Published rounded share of women among all subjects and sources in that medium and round. |

## `gmmp_topics.csv`

Forty-four rounded values from final-report Table 1 (printed p. 7), with 2025 category findings discussed beside Figures 10–11 (p. 29). One row is women's share of **people in stories assigned to that major news topic**, by medium and monitoring round. It is not women's share of experts, the fraction of stories about that topic or a distribution that sums to 100%.

| Column | Meaning |
| --- | --- |
| `medium`, `year`, `women_percent` | As above, using each topic's subjects-and-sources denominator. |
| `topic` | `social_legal`, `science_health`, `economy`, `politics_government`, `sports`, or `crime_violence_excluding_gbv`. The final category excludes gender-based violence, which the report treats separately. |

Social/legal, science/health, economy and politics/government have seven legacy and three website rounds. Sports and crime/violence excluding GBV are recorded here **only for 2025**; the Table 1 layout does not provide comparable earlier values for these separate categories. Missing earlier rows mean unavailable, not zero. The 2025 legacy economy share is 25%, while the website economy share is 27%; those are global topic figures, not Hong Kong or expert-role rates. Economy and politics/government increased by 15 percentage points from 1995 to 2025 in legacy news, using the published rounded endpoints.

## `gmmp_economic_subtopics_2025.csv`

Two selected economic subtopics from final-report Table 4 (printed p. 31). These values describe women's share among people in those narrower print/radio/TV story topics in 2025: economic crises/company takeovers 15%, and economic policies/markets/taxes 19%. They are not a complete breakdown of economic news, are not added together and are not substituted for the 25% major-topic economy value.

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

The `sources` object maps S01–S05 and C01–C06 to direct URLs, locators and intended uses. The `method` object records the separate global denominators, local selection, unit, role adaptation, presentation rule and limits. `S06` in the proposal names a course outline that was not supplied in this folder and is therefore not presented as a public source on the site.

An independent second coding pass, audience test, practitioner feedback and any original interviews remain proposed activities. Add dated records only if they actually occur, and update the site and files together if the result changes.
