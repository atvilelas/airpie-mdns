import puppeteer from 'puppeteer';
import express from 'express';

const startWebServer = () => {
  const expressApp = express();

  expressApp.get('/', (req, res) => {
    res.sendFile(__dirname + '../test-report.html');
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
  await page.goto('http://localhost:65534/test-report.html');

  const pageContent = await page.$('.jesthtml-content');
  if (!pageContent) {
    console.log('Test summary content not found.');
    browser.close();
    webServer.close();
  }
  const rect = pageContent?.boundingBox();
  console.log(rect);

  await browser.close();
};
