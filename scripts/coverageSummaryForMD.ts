import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const startWebServer = () => {
  const expressApp = express();

  expressApp.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../test-report-md/index.html'));
  });

  expressApp.get('/jest-html-reporters-attach/index/index.js', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../test-report-md/jest-html-reporters-attach/index/index.js'));
  });

  expressApp.get('/jest-html-reporters-attach/index/result.js', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../test-report-md/jest-html-reporters-attach/index/result.js'));
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
  await page.setViewport({
    width: 1920,
    height: 1000,
  });
  // Navigate the page to a URL
  await page.goto('http://localhost:65534/');
  const html = await page.$('body');
  // const pageStyles = await (await page.$('style'))?.evaluate((el) => el.innerHTML);
  const pagePuppeteerContent = await page.$('#app');
  if (!pagePuppeteerContent) {
    console.log('Test summary content not found.');
    browser.close();
    webServer.close();
  }

  const scriptBase64 = fs
    .readFileSync(path.resolve(__dirname + '/../../test-report-md/jest-html-reporters-attach/index/index.js'))
    .toString('base64');
  const resultBase64 = fs
    .readFileSync(path.resolve(__dirname + '/../../test-report-md/jest-html-reporters-attach/index/result.js'))
    .toString('base64');

  const rect = await html?.boundingBox();
  console.log(rect);
  const svg = `<svg fill="none" viewBox="0 0 ${Math.ceil(rect?.width ?? 0)} ${Math.ceil(
    rect?.height ?? 0,
  )}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="height: 100%; width: 100%">
      <html style="height: 100%; width: 100%">
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1,maximum-scale=1"
          />
        <body style="height: 100%; width: 100%">
          <div style="display: none" id="base64Script">${scriptBase64}</div>
          <div style="display: none" id="base64Result">${resultBase64}</div>
          <div id="app" style="height: 100%; width: 100%"></div>
          <button onClick="alert('ok')">OK</button>
          <script>
            alert('hey');
          </script>
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
