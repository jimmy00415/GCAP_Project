const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function rows(name) {
  const text = fs.readFileSync(path.join(root, 'data', name), 'utf8').trim();
  const [header, ...lines] = text.split(/\r?\n/);
  const keys = header.split(',');
  return lines.map((line) => Object.fromEntries(line.split(',').map((value, index) => [keys[index], value])));
}

test('GMMP table contains all 48 final-report values and the correct 2025 role comparison', () => {
  const data = rows('gmmp_roles.csv');
  assert.equal(data.length, 48);
  const get = (medium, year, role) => Number(data.find((row) => row.medium === medium && Number(row.year) === year && row.role === role)?.women_percent);
  const expected = {
    legacy: {
      subject: [23, 23, 26, 24, 24],
      spokesperson: [14, 19, 20, 22, 23],
      expert_or_commentator: [17, 20, 19, 24, 23],
      personal_experience: [31, 36, 38, 42, 42],
      eye_witness: [30, 29, 30, 30, 35],
      popular_opinion: [34, 44, 37, 38, 45]
    },
    website: {
      subject: [26, 28, 29],
      spokesperson: [18, 25, 25],
      expert_or_commentator: [21, 25, 28],
      personal_experience: [38, 41, 39],
      eye_witness: [27, 30, 34],
      popular_opinion: [42, 39, 40]
    }
  };
  for (const [medium, roles] of Object.entries(expected)) {
    const years = medium === 'legacy' ? [2005, 2010, 2015, 2020, 2025] : [2015, 2020, 2025];
    for (const [role, values] of Object.entries(roles)) {
      assert.deepEqual(years.map((year) => get(medium, year, role)), values, `${medium}: ${role}`);
    }
  }
  assert.equal(get('legacy', 2025, 'personal_experience') - get('legacy', 2025, 'expert_or_commentator'), 19);
  assert.equal(get('website', 2025, 'personal_experience') - get('website', 2025, 'expert_or_commentator'), 11);
});

test('overall visibility follows only the ten published monitoring points', () => {
  assert.ok(fs.existsSync(path.join(root, 'data', 'gmmp_visibility.csv')), 'visibility CSV is missing');
  const data = rows('gmmp_visibility.csv');
  assert.equal(data.length, 10);
  const values = (medium) => data.filter((row) => row.medium === medium).map((row) => [Number(row.year), Number(row.women_percent)]);
  assert.deepEqual(values('legacy'), [[1995, 17], [2000, 18], [2005, 21], [2010, 24], [2015, 24], [2020, 25], [2025, 26]]);
  assert.deepEqual(values('website'), [[2015, 25], [2020, 28], [2025, 29]]);
  assert.ok(data.every((row) => Number(row.women_percent) >= 0 && Number(row.women_percent) <= 100));
});

test('topic data retain four historical series and two 2025-only topics', () => {
  assert.ok(fs.existsSync(path.join(root, 'data', 'gmmp_topics.csv')), 'topic CSV is missing');
  const data = rows('gmmp_topics.csv');
  assert.equal(data.length, 44);
  const values = (medium, topic) => data.filter((row) => row.medium === medium && row.topic === topic).map((row) => [Number(row.year), Number(row.women_percent)]);
  assert.deepEqual(values('legacy', 'social_legal'), [[1995, 19], [2000, 21], [2005, 28], [2010, 30], [2015, 28], [2020, 32], [2025, 27]]);
  assert.deepEqual(values('legacy', 'science_health'), [[1995, 27], [2000, 21], [2005, 22], [2010, 32], [2015, 35], [2020, 30], [2025, 36]]);
  assert.deepEqual(values('legacy', 'economy'), [[1995, 10], [2000, 18], [2005, 20], [2010, 20], [2015, 21], [2020, 24], [2025, 25]]);
  assert.deepEqual(values('legacy', 'politics_government'), [[1995, 7], [2000, 12], [2005, 14], [2010, 19], [2015, 16], [2020, 20], [2025, 22]]);
  assert.deepEqual(values('website', 'social_legal'), [[2015, 28], [2020, 32], [2025, 27]]);
  assert.deepEqual(values('website', 'science_health'), [[2015, 41], [2020, 31], [2025, 36]]);
  assert.deepEqual(values('website', 'economy'), [[2015, 23], [2020, 23], [2025, 27]]);
  assert.deepEqual(values('website', 'politics_government'), [[2015, 19], [2020, 21], [2025, 24]]);
  assert.deepEqual(values('legacy', 'sports'), [[2025, 15]]);
  assert.deepEqual(values('website', 'sports'), [[2025, 14]]);
  assert.deepEqual(values('legacy', 'crime_violence_excluding_gbv'), [[2025, 21]]);
  assert.deepEqual(values('website', 'crime_violence_excluding_gbv'), [[2025, 21]]);
});

test('economic subtopic detail remains two selected print/radio/TV values', () => {
  assert.ok(fs.existsSync(path.join(root, 'data', 'gmmp_economic_subtopics_2025.csv')), 'economic subtopic CSV is missing');
  const data = rows('gmmp_economic_subtopics_2025.csv');
  assert.deepEqual(data.map((row) => [row.topic, Number(row.women_percent)]), [
    ['economic_crisis_company_takeovers', 15],
    ['economic_policies_markets_taxes', 19]
  ]);
});

test('local cases reconcile to six articles, eight appearances and six people without dropping unknowns', () => {
  const data = rows('local_cases.csv');
  assert.equal(data.length, 8);
  assert.equal(new Set(data.map((row) => row.case_id)).size, 6);
  assert.equal(new Set(data.map((row) => row.person_id)).size, 6);
  assert.deepEqual(Object.fromEntries(['F', 'M', 'U'].map((code) => [code, data.filter((row) => row.gender_presentation === code).length])), { F: 4, M: 3, U: 1 });
  const people = [...new Map(data.map((row) => [row.person_id, row])).values()];
  assert.deepEqual(Object.fromEntries(['F', 'M', 'U'].map((code) => [code, people.filter((row) => row.gender_presentation === code).length])), { F: 3, M: 2, U: 1 });
  assert.equal(data.find((row) => row.gender_presentation === 'U')?.person, 'Michael Fitzgerald');
  assert.doesNotMatch(data.find((row) => row.gender_presentation === 'U')?.rationale, /\b(he|his|she|her)\b/i);
  assert.equal(data.filter((row) => row.role === 'specialist_commentator').length, 4);
  assert.equal(data.filter((row) => row.role === 'institutional_spokesperson').length, 4);
  assert.ok(data.every((row) => /^https:\/\/news\.rthk\.hk\//.test(row.article_url)));
  assert.ok(data.every((row) => row.rationale && row.contribution && row.gender_evidence));
});

test('source register identifies primary material behind statistics, coding, cases and quotes', () => {
  const ledger = JSON.parse(fs.readFileSync(path.join(root, 'data', 'sources.json'), 'utf8'));
  for (const id of ['S01', 'S02', 'S03', 'S04', 'S05', 'C01', 'C02', 'C03', 'C04', 'C05', 'C06']) {
    assert.ok(ledger.sources[id]?.url?.startsWith('https://'), `${id} needs a source URL`);
  }
  assert.match(ledger.method.local_selection, /purposive/i);
  assert.match(ledger.method.gender_presentation, /not established/i);
  assert.match(ledger.method.global_denominator, /within each source role/i);
});
