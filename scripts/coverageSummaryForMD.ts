import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const startWebServer = () => {
  const expressApp = express();

  expressApp.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../test-report.html'));
  });

  const webServer = expressApp.listen(65534, () => {
    console.log('App listening on port 65534');
  });

  return webServer;
};

const headlessChrome = async () => {
  const webServer = startWebServer();
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('http://localhost:65534/');
  const html = await page.$('body');
  const pageStyles = await (await page.$('style'))?.evaluate((el) => el.innerHTML);
  const pagePuppeteerContent = await page.$('.jesthtml-content');
  if (!pagePuppeteerContent) {
    console.log('Test summary content not found.');
    browser.close();
    webServer.close();
  }
  const pageContent = await pagePuppeteerContent?.evaluate((el) => el.innerHTML);
  const rect = await html?.boundingBox();
  const svg = `<svg fill="none" viewBox="0 0 ${Math.ceil(rect?.width ?? 0)} ${Math.ceil(
    rect?.height ?? 0,
  )}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        ${pageStyles}
      </style>
      <html>
        <body>
          <div class="jesthtml-content">
            ${pageContent?.replace(/(<input)([^>]*)/g, '$1$2/')}
          </div>
        </body>
      </html>
    </div>
  </foreignObject>
</svg>
`;
  fs.writeFileSync(path.resolve(__dirname + '/../../test-report.svg'), svg);

  await browser.close();
  webServer.close();
};

headlessChrome();
