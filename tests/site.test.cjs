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
  for (const label of ['Evidence', 'Cases', 'Voices', 'Checklist', 'Method']) {
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
    assert.equal(localPaths.length, 5);
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
