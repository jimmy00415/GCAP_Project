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
