const puppeteer = require('puppeteer');
const { log } = require('./utils');
/*
HEADLESS
const browser = await puppeteer.launch();

HEADFUL
const browser = await puppeteer.launch({
  headless: false,
  devtools: true
});
*/

puppeteer.launch()
  .then(async (browser) => {
    /*
    SETUP:
      - Open a Blank Page
      - Nav to URL
    */
    const page = await browser.newPage();
    await page.goto('https://www.google.com');

    /*
    PAGE TESTING:
      - Viewport Dimensions
    */
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });

    /*
    INTERACTIVITY:
      - Type
      - Click
    */
    await page.type('#lst-ib', 'michael jackson anti-gravity shoes patent');
    await page.click('input[name="btnK"]');
    await page.waitForSelector('h3.r > a');

    const searchResults = await page.evaluate(results => {
      const anchors = [...document.querySelectorAll(results)];
      return anchors.map((a) => {
        return {
          title: a.innerText,
          href: a.href,
        };
      });
    }, 'h3.r > a');

    log.info({ dimensions, searchResults });

    /*
    VQA:
      - Screenshots
      - PDFs
    */
    await page.screenshot({ path: './screenshots/google_test.png' });
    await page.pdf({ path: './pdfs/google_test.pdf', format: 'A4' });

    // Exit
    await browser.close();
  });
