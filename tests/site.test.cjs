const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

const siteUrl = pathToFileURL(path.resolve(__dirname, '..', 'index.html')).href;
let browser;

test.before(async () => {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
});

test.after(async () => {
  await browser?.close();
});

async function visit(options = {}) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto(siteUrl);
  return { context, page };
}

test('lead states the five-W finding before interaction and gives its denominator', async () => {
  const { context, page } = await visit();
  assert.match((await page.locator('h1').innerText()).replace(/\s+/g, ' '), /Who Gets to Be the Expert\?/);
  assert.match(await page.locator('#intro').innerText(), /23%/);
  assert.match(await page.locator('#intro').innerText(), /42%/);
  assert.match(await page.locator('#intro').innerText(), /2025/);
  assert.match(await page.locator('#intro').innerText(), /global/i);
  assert.match(await page.locator('#intro').innerText(), /print.*radio.*television/i);
  assert.match(await page.locator('#intro').innerText(), /within each source role/i);
  await context.close();
});

test('desktop opening screen includes both labelled values and the global scope note', async () => {
  const { context, page } = await visit({ viewport: { width: 1440, height: 900 } });
  const scope = await page.locator('.scope-note').boundingBox();
  const stats = await page.locator('.hero-stats').boundingBox();
  assert.ok(stats.y + stats.height <= 900, 'labelled 23% and 42% comparison is below the first screen');
  assert.ok(scope.y + scope.height <= 900, 'global scope note is below the first screen');
  await context.close();
});

test('story has a logical contents journey and directly sourced evidence', async () => {
  const { context, page } = await visit();
  const nav = page.getByRole('navigation', { name: 'Story contents' });
  for (const label of ['Roles', 'Wider view', 'Over time', 'Hong Kong', 'Checklist', 'Method']) {
    assert.ok(await nav.getByRole('link', { name: label, exact: true }).count(), `${label} navigation`);
  }
  assert.equal(await page.locator('[data-case-card]').count(), 6);
  assert.equal(await page.locator('[data-case-card] a[href^="https://news.rthk.hk/"]').count(), 6);
  assert.ok(await page.getByRole('table', { name: '2025 source-role values' }).count());
  assert.ok(await page.getByRole('table', { name: 'Expert-source monitoring rounds' }).count());
  assert.ok(await page.getByRole('table', { name: 'Selected-case counts' }).count());
  assert.equal(await page.locator('blockquote').count(), 2);
  assert.match(await page.locator('#voices').innerText(), /Sarah Macharia/);
  assert.match(await page.locator('#voices').innerText(), /participant E36/i);
  await context.close();
});

test('the wider-view chapters separate overall visibility from topic and role denominators', async () => {
  const { context, page } = await visit();
  const visibility = page.locator('#visibility');
  const topics = page.locator('#topics');
  assert.ok(await visibility.isVisible());
  assert.ok(await topics.isVisible());
  assert.match(await visibility.innerText(), /all people seen, heard or spoken about/i);
  assert.match(await topics.innerText(), /people in stories assigned to (?:each|a) topic/i);
  assert.match(await page.locator('#evidence').innerText(), /speaking (?:role|function)/i);
  const visibilityTable = page.getByRole('table', { name: 'Overall presence across observed rounds' });
  assert.deepEqual(await visibilityTable.locator('tbody tr').evaluateAll((rows) => rows.map((row) => [...row.querySelectorAll('td')].map((cell) => cell.textContent.trim()))), [
    ['17%', '18%', '21%', '24%', '24%', '25%', '26%'],
    ['—', '—', '—', '—', '25%', '28%', '29%']
  ]);
  const topicTable = page.getByRole('table', { name: '2025 major topic values' });
  assert.deepEqual(await topicTable.locator('tbody tr').evaluateAll((rows) => rows.map((row) => [...row.children].map((cell) => cell.textContent.trim()).join(' '))), [
    'Sports 15% 14%',
    'Crime and violence excluding GBV 21% 21%',
    'Politics and government 22% 24%',
    'Economy 25% 27%',
    'Social and legal 27% 27%',
    'Science and health 36% 36%'
  ]);
  assert.equal(await page.locator('#topics .topic-row').count(), 6);
  for (const file of ['gmmp_visibility.csv', 'gmmp_topics.csv', 'gmmp_economic_subtopics_2025.csv']) {
    assert.ok(await page.locator(`a[href="data/${file}"]`).count(), `${file} download`);
  }
  await context.close();
});

test('the complete role grid exposes every published round without inventing website history', async () => {
  const { context, page } = await visit({ javaScriptEnabled: false });
  const data = fs.readFileSync(path.resolve(__dirname, '..', 'data', 'gmmp_roles.csv'), 'utf8').trim().split(/\r?\n/).slice(1).map((line) => {
    const [medium, year, role, value] = line.split(',');
    return `${medium}:${year}:${role}:${value}`;
  }).sort();
  const cells = await page.locator('#role-grid td[data-medium][data-year][data-role][data-value]').evaluateAll((nodes) => nodes.map((node) => `${node.dataset.medium}:${node.dataset.year}:${node.dataset.role}:${node.dataset.value}`).sort());
  assert.deepEqual(cells, data);
  assert.ok(await page.getByRole('table', { name: 'All print radio and television role values' }).isVisible());
  assert.ok(await page.getByRole('table', { name: 'All news website role values' }).isVisible());
  await context.close();
});

test('the recurrence matrix reveals all eight appearances across six identified people', async () => {
  const { context, page } = await visit();
  const matrix = page.getByRole('table', { name: 'Person-article recurrence matrix' });
  assert.ok(await matrix.isVisible());
  const pairs = await matrix.locator('td[data-present="true"]').evaluateAll((nodes) => nodes.map((node) => `${node.closest('tr').dataset.person}:${node.dataset.case}`).sort());
  assert.deepEqual(pairs, [
    'p_bonnie_chan:C05',
    'p_eddie_kwok:C01',
    'p_eddie_kwok:C06',
    'p_hannah_jeong:C02',
    'p_jeny_yeung:C03',
    'p_jeny_yeung:C04',
    'p_lau_chun_kong:C02',
    'p_michael_fitzgerald:C03'
  ]);
  assert.equal(await matrix.locator('tbody tr').count(), 6);
  assert.match(await page.locator('#counting').innerText(), /not established from selected text/i);
  await context.close();
});

test('mobile and tablet time charts remain readable and keyboard scrollable', async () => {
  for (const width of [390, 768]) {
    const { context, page } = await visit({ viewport: { width, height: 844 } });
    for (const selector of ['.overview-shell .chart-scroll', '.trend-shell .chart-scroll']) {
      const viewport = page.locator(selector);
      assert.ok(await viewport.count(), `${selector} missing`);
      const dimensions = await viewport.evaluate((node) => ({ client: node.clientWidth, content: node.scrollWidth, tabIndex: node.tabIndex, svgWidth: node.querySelector('svg').getBoundingClientRect().width }));
      assert.ok(dimensions.content > dimensions.client, `${selector} does not offer horizontal inspection at ${width}px`);
      assert.ok(dimensions.svgWidth >= 700, `${selector} compresses axis labels at ${width}px`);
      assert.equal(dimensions.tabIndex, 0, `${selector} cannot be scrolled from keyboard`);
      assert.ok(await page.locator(`${selector} ~ .chart-note`).count(), `${selector} lacks an explanatory note`);
    }
    assert.equal(await page.locator('.overview-shell .scroll-hint').isVisible(), true);
    await context.close();
  }
});

test('mobile evidence tables remain keyboard scrollable', async () => {
  const { context, page } = await visit({ viewport: { width: 390, height: 844 } });
  const matrixViewport = page.locator('.matrix-block .table-wrap');
  assert.equal(await matrixViewport.getAttribute('tabindex'), '0');
  assert.match(await page.locator('.matrix-block').innerText(), /scroll.*article columns|swipe.*article columns/i);
  const topicTableViewport = page.locator('#topics .table-wrap');
  assert.equal(await topicTableViewport.getAttribute('tabindex'), '0');
  assert.match(await page.locator('#topics').innerText(), /swipe table to see website values/i);
  await context.close();
});

test('published tables retain the checked 2025 and local count values', async () => {
  const { context, page } = await visit();
  const tableRows = (name) => page.getByRole('table', { name }).locator('tbody tr').evaluateAll((rows) => rows.map((row) => [...row.children].map((cell) => cell.textContent.trim()).join(' ')));
  const roleRows = await tableRows('2025 source-role values');
  assert.deepEqual(roleRows, [
    'Expert or commentator 23% 28%',
    'Spokesperson 23% 25%',
    'Subject 24% 29%',
    'Eye witness 35% 34%',
    'Personal experience 42% 39%',
    'Popular opinion 45% 40%'
  ]);
  const countRows = await tableRows('Selected-case counts');
  assert.deepEqual(countRows, [
    'F · Explicit female presentation 4 3',
    'M · Explicit male presentation 3 2',
    'U · Not established from selected text 1 1',
    'Total 8 6'
  ]);
  await context.close();
});

test('every internal story anchor resolves and no local content link is missing', async () => {
  const { context, page } = await visit();
  const links = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')));
  assert.ok(links.every((href) => href && href !== '#' && !href.startsWith('javascript:')));
  for (const href of links.filter((value) => value.startsWith('#'))) {
    assert.ok(await page.locator(href).count(), `missing target ${href}`);
  }
  for (const href of links.filter((value) => !value.startsWith('#') && !value.startsWith('https://'))) {
    assert.ok(fs.existsSync(path.resolve(__dirname, '..', href)), `missing local file ${href}`);
  }
  await context.close();
});

test('the whole report and both medium panels remain readable without JavaScript', async () => {
  const { context, page } = await visit({ javaScriptEnabled: false });
  assert.ok(await page.locator('#role-legacy').isVisible());
  assert.ok(await page.locator('#role-web').isVisible());
  assert.ok(await page.locator('#cases').isVisible());
  assert.ok(await page.locator('#method').isVisible());
  assert.ok(await page.locator('#visibility').isVisible());
  assert.ok(await page.locator('#topics').isVisible());
  assert.match(await page.locator('#counting').innerText(), /not established from selected text/i);
  await context.close();
});

test('layouts at 360, 768 and 1440 CSS pixels have no page-level horizontal overflow', async () => {
  for (const width of [360, 768, 1440]) {
    const { context, page } = await visit({ viewport: { width, height: 900 } });
    const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    assert.ok(sizes.scroll <= sizes.viewport + 1, `${width}px overflow: ${sizes.scroll}`);
    await context.close();
  }
});

test('mobile contents stay available without obscuring the story', async () => {
  const { context, page } = await visit({ viewport: { width: 390, height: 844 } });
  await page.locator('#cases').scrollIntoViewIfNeeded();
  const box = await page.getByRole('navigation', { name: 'Story contents' }).boundingBox();
  assert.ok(box.y >= 0 && box.y < 10, `mobile contents scrolled away: y=${box.y}`);
  assert.ok(box.height <= 65, `mobile contents obscure the story: height=${box.height}`);
  await context.close();
});

test('source citations use a readable hanging indent at mobile and desktop widths', async () => {
  for (const width of [360, 1440]) {
    const { context, page } = await visit({ viewport: { width, height: 800 } });
    const misplaced = await page.locator('.references li').evaluateAll((items) => items.flatMap((item) => {
      const idRight = item.querySelector('strong').getBoundingClientRect().right;
      const fragments = [];
      for (const child of item.childNodes) {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
          const range = document.createRange();
          range.selectNodeContents(child);
          fragments.push(...range.getClientRects());
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'STRONG') {
          fragments.push(child.getBoundingClientRect());
        }
      }
      return fragments.filter((rect) => rect.width > 1 && rect.left < idRight + 4).map(() => item.id);
    }));
    assert.deepEqual(misplaced, [], `${width}px: citation fragments fell under the source ID: ${misplaced.join(', ')}`);
    await context.close();
  }
});

test('small accent labels on case cards meet 4.5 to 1 text contrast', async () => {
  const { context, page } = await visit();
  const contrast = await page.locator('.featured-card .case-top').first().evaluate((node) => {
    const luminance = (color) => {
      const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map((value) => {
        const normalized = value / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const foreground = luminance(getComputedStyle(node).color);
    const background = luminance(getComputedStyle(node.closest('.featured-card')).backgroundColor);
    return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
  });
  assert.ok(contrast >= 4.5, `case label contrast is only ${contrast.toFixed(2)}:1`);
  await context.close();
});

test('medium switch changes visible chart, pressed state and contextual explanation together', async () => {
  const { context, page } = await visit();
  const legacy = page.getByRole('button', { name: 'Print / radio / TV' });
  const website = page.getByRole('button', { name: 'News websites' });
  assert.ok(await page.locator('#role-legacy').isVisible());
  assert.equal(await page.locator('#role-web').isVisible(), false);
  assert.equal(await legacy.getAttribute('aria-pressed'), 'true');
  await website.click();
  assert.equal(await page.locator('#role-legacy').isVisible(), false);
  assert.ok(await page.locator('#role-web').isVisible());
  assert.equal(await website.getAttribute('aria-pressed'), 'true');
  assert.equal(await legacy.getAttribute('aria-pressed'), 'false');
  assert.match(await page.locator('#comparison-context').innerText(), /28% expert.*39% personal-experience.*11 percentage points/i);
  await legacy.click();
  assert.match(await page.locator('#comparison-context').innerText(), /23% expert.*42% personal-experience.*19 percentage points/i);
  await context.close();
});

test('the website medium can be selected from the keyboard', async () => {
  const { context, page } = await visit();
  const website = page.getByRole('button', { name: 'News websites' });
  await website.focus();
  await page.keyboard.press('Enter');
  assert.equal(await website.getAttribute('aria-pressed'), 'true');
  assert.ok(await page.locator('#role-web').isVisible());
  await context.close();
});

test('reading progress updates after scrolling', async () => {
  const { context, page } = await visit();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(80);
  const width = await page.locator('#reading-progress').evaluate((node) => parseFloat(node.style.width));
  assert.ok(width >= 95, `progress only ${width}%`);
  await context.close();
});

test('printable checklist is a working local page with five checks', async () => {
  const { context, page } = await visit();
  await page.getByRole('link', { name: /Open the one-page printable checklist/ }).click();
  assert.match(page.url(), /checklist\.html$/);
  assert.equal(await page.getByRole('checkbox').count(), 5);
  await context.close();
});

test('relative assets and downloads load from a nested project path', async () => {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'expert-pages-'));
  const nested = path.join(temporaryRoot, 'sample-project');
  fs.mkdirSync(nested);
  for (const file of ['index.html', 'styles.css', 'script.js', 'checklist.html']) {
    fs.copyFileSync(path.resolve(__dirname, '..', file), path.join(nested, file));
  }
  fs.cpSync(path.resolve(__dirname, '..', 'data'), path.join(nested, 'data'), { recursive: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(pathToFileURL(path.join(nested, 'index.html')).href);
    assert.ok(await page.evaluate(() => document.querySelector('link[rel="stylesheet"]').sheet !== null));
    assert.ok(await page.evaluate(() => document.documentElement.classList.contains('js')));
    await page.getByRole('button', { name: 'News websites' }).click();
    assert.ok(await page.locator('#role-web').isVisible());
    const localPaths = await page.locator('a[href^="data/"]').evaluateAll((links) => links.map((link) => link.href));
    assert.ok(localPaths.length >= 8);
    assert.ok(localPaths.every((url) => url.includes('/sample-project/data/')));
    await context.close();
  } finally {
    const tempBase = path.resolve(os.tmpdir()) + path.sep;
    assert.ok(path.resolve(temporaryRoot).startsWith(tempBase));
    assert.ok(path.basename(temporaryRoot).startsWith('expert-pages-'));
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});

test('story and printable checklist have no serious or critical WCAG accessibility violations', async () => {
  const { context, page } = await visit();
  for (const destination of [siteUrl, pathToFileURL(path.resolve(__dirname, '..', 'checklist.html')).href]) {
    await page.goto(destination);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const failures = result.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
    assert.deepEqual(failures.map((violation) => `${violation.id}: ${violation.nodes.length} affected elements`), [], destination);
  }
  await context.close();
});
