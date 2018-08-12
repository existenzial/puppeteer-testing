const puppeteer = require('puppeteer');
const { log } = require('./utils');

// Pre-render html
async function ssr(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });

  const html = page.content();

  await browser.close();

  return html;
}

module.exports = {
  ssr,
};
