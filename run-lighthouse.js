
require('dotenv').config();
console.log(process.env.USERNAME_APP); // Should log your username
console.log(process.env.PASSWORD); // Should log your password

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--remote-debugging-port=9222'] // Enable remote debugging
  });

  const page = await browser.newPage();
  let finalUrl = '';

  // Listen for navigation events to capture the final URL
  page.on('framenavigated', async (frame) => {
    if (frame === page.mainFrame()) {
      finalUrl = frame.url();
      console.log(`Navigated to: ${finalUrl}`);
    }
  });

  // Navigate to your application login page
  await page.goto(process.env.URL); // Replace with your actual app URL

  // Automate the login process
  await page.waitForSelector('input[name="username"]'); // Adjust selectors as needed
  await page.type('input[name="username"]', process.env.USERNAME_APP); // Replace with your username
  await page.type('input[name="password"]', process.env.PASSWORD); // Replace with your password
  await page.click('button[type="submit"]'); // Adjust the selector to match the submit button

  // Wait for navigation after login
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // Dynamically import Lighthouse
  const lighthouse = await import('lighthouse');

  // Run Lighthouse with the final URL
  const result = await lighthouse.default(finalUrl, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'html',
    logLevel: 'info',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });

  // Extract the HTML report from the Lighthouse result
  const reportHtml = result.report;

  // Save the report
  const reportPath = path.join(__dirname, 'lighthouse-report.html');
  fs.writeFileSync(reportPath, reportHtml);

  console.log('Lighthouse report saved at:', reportPath);

  await browser.close();
})();
