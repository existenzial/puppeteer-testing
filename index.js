const puppeteer = require('puppeteer');
/*
HEADLESS
const browser = await puppeteer.launch();

HEADFUL
const browser = await puppeteer.launch({ headless: false });
*/

// Launch Headless Chrome
puppeteer.launch()
  .then(async (browser) => {
    // Open New Blank Page
    const page = await browser.newPage();
    // Navigate to Page Actual
    await page.goto('https://www.google.com');
    // Take a Screenshot of Page
    await page.screenshot({ path: './screenshots/google_test.png' });
    // Close Browser
    await browser.close();
  });
