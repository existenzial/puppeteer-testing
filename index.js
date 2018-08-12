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

    log.info({ dimensions });

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
