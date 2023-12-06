import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const headlessChrome = async () => {
  const readme = fs.readFileSync(path.resolve(__dirname + '/../../README.md'), { encoding: 'utf8' });
  const testReport = fs.readFileSync(path.resolve(__dirname + '/../../test-report.html'), {
    encoding: 'utf8',
  });

  const [, , , testReportStyles] = Array.from(/(<style)([^>]*[>])((.|\n)*)(<\/style>)/gm.exec(testReport) || []);
  const [, , , testReportContent] = Array.from(/([\S\s]*)(<body>)([\S\s]*)(<\/body>)/gm.exec(testReport) || []);
  const [, contentBeforeStyle, testStyleOpenTag, , testStyleCloseTag, contentAfterStyle] = Array.from(
    /([\S\s]*)(<TestSummaryStyles>)([\S\s]*)(<\/TestSummaryStyles>)([\S\s]*)/gm.exec(readme) || [],
  );
  const cleanedReportStyle = (testReportStyles || '')
    .replace(/body/gm, 'div.body')
    .replace(/html/gm, 'div.html')
    .replace(/\n\n/gm, '\n')
    .replace(/\n\n/gm, '\n');
  const readmeWithTestStyle =
    contentBeforeStyle +
    '\n' +
    testStyleOpenTag +
    '\n<style>\n' +
    (cleanedReportStyle || '') +
    '\n</style>\n' +
    testStyleCloseTag +
    '\n' +
    contentAfterStyle;
  const [, contentBeforeTestContent, testContentOpenTag, , testContentCloseTag, contentAfterTestContent] = Array.from(
    /([\S\s]*)(<TestSummaryContent>)([\S\s]*)(<\/TestSummaryContent>)([\S\s]*)/gm.exec(readmeWithTestStyle) || [],
  );
  const readmeWithTestStyleAndTestContent =
    contentBeforeTestContent +
    '\n' +
    testContentOpenTag +
    '\n<div class="html"><div class="body">' +
    (testReportContent || '') +
    '</div></div>\n' +
    testContentCloseTag +
    '\n' +
    contentAfterTestContent;

  fs.writeFileSync(path.resolve(__dirname + '/../../README.md'), readmeWithTestStyleAndTestContent);
  //
  //   // Launch the browser and open a new blank page
  //   const browser = await puppeteer.launch({ headless: 'new' });
  //   const page = await browser.newPage();

  //   // Navigate the page to a URL
  //   await page.goto('http://localhost:65534/');
  //   const html = await page.$('body');
  //   const pageStyles = await (await page.$('style'))?.evaluate((el) => el.innerHTML);
  //   const pagePuppeteerContent = await page.$('.jesthtml-content');
  //   if (!pagePuppeteerContent) {
  //     console.log('Test summary content not found.');
  //     browser.close();
  //     webServer.close();
  //   }
  //   const pageContent = await pagePuppeteerContent?.evaluate((el) => el.innerHTML);
  //   const rect = await html?.boundingBox();
  //   const bodyNode = await page.evaluateHandle('document');
  //   console.log(
  //     await page.screenshot({
  //       path: 'screenshot.jpg',
  //       fullPage: true,
  //     }),
  //   );
  //   const svg = `<svg fill="none" viewBox="0 0 ${Math.ceil(rect?.width ?? 0)} ${Math.ceil(
  //     rect?.height ?? 0,
  //   )}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  //   <foreignObject width="100%" height="100%">
  //     <div xmlns="http://www.w3.org/1999/xhtml">
  //       <style>
  //         ${pageStyles}
  //       </style>
  //       <div class="jesthtml-content">
  //         ${pageContent?.replace(/(<input)([^>]*)/g, '$1$2/')}
  //       </div>
  //     </div>
  //   </foreignObject>
  // </svg>
  // `;
  // fs.writeFileSync(path.resolve(__dirname + '/../../readme-test-report.svg'), svg);

  // await browser.close();
  // webServer.close();
};

headlessChrome();
