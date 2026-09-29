const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

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
