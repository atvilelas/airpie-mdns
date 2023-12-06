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

  const rect = await html?.boundingBox();
  console.log(rect);
  const svg = `<svg fill="none" viewBox="0 0 ${Math.ceil(rect?.width ?? 0)} ${Math.ceil(
    rect?.height ?? 0,
  )}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="height: 100%; width: 100%">
      <html style="height: 100%; width: 100%">
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
          <meta name="keywords" contect="jest, reporters" />
          <meta name="author" contect="hazyzh" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1,maximum-scale=1"
          />
          <link
            rel="shortcut icon"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHX0lEQVR4Xu2bfWwUVRDAZ/buSsG0Vxq1EAhtL/e2kKISAVEoKJVE4gfiR6wmJsoflpBANLZKqyRIgVg+/CLBNqKoMX5RKWhFsUbRBuJHRCoECLt7x0Jb5IBmr62tx+3dPrNH93Itd7e7xx0ccu+/dmfmzfz2vXmzu3MI1/jAazx+yADIrIBrnMDl2gK4atWqF8+ePXufx+OZFAgEbLG422w2/8SJE7fW1dXVAgBN9f1JOYD6+vqb2trafhUEYZSZYAghA3Pnzp1eXV19xIyeWdmUAli2bNmIY8eOeUVRzDbrmCo/duzYwPz580tqa2vdiegb0UkpgKVLl/7c2to6R3OEYRgoLS2F7OzoPHw+Hxw+fBgURQn7Xl5efqCxsfFWI8EkIpMQAIfDMc1iscxHxFmU0pGxJs7Pz79TkqTQZYfDAVu2bIHx48fH9bOvrw8WL14M+/fvD8nl5uZCT0/Pz1GU/ADQBQBuRPzF7/fvFUXRZxaCKQDFxcUlVqv1NUS8T28iu92uOh4WW7duHSxcuFBPLXR9586dsHz58rBsXl4eeL1ePd1/AGDjwMDA+s7Ozn/1hLXrhgGwLHsbpfQ7RMwzYvwKAAi5RSnlFUUpc7lcZ4z4aQiA0+m8HRF/QMSLMjmlVKV9FAD6hk84bty4OadOnQrNMXXqVGhoaAAVTLzR0dEBlZWV4HZfyHs5OTnQ29sbbQuol7MAYAYiMpE2KaVuWZZniaJ4Wg+CLgCWZR0A8AcAjNaMUUp9iLg6EAg0ud1uIdZ5XVVVtb2lpeVhTS/BJPhnY2Pj1FiBFBUVjcnKylpBKV0yDMTBnp6emR6Ppz8eBF0AhJAmRHw0IvjfZFl+XBRFUY9uZWWlzev1dra3t9+oJxvtupljkGXZ6QDQBACFEbZe5ziuKmEAhJBJiBguRCilXbIsTxZFUTcjaZOqECwWy762trbpsiwb4mCz2aCsrKydZdkFVVVVHYaUAIAQMgURfxvcGmo++BcRJ3Acdy6WjbgrgGXZegAIp2NFUR4UBOErow5FyqkVocfjqQ8Gg9fF07dYLP0FBQU1NTU1hxKZhxBSjYgbIlbsCzzPb0wIACHkCCJOGsyuB3iej1qQ9PrPPaUAPJ2Iw8nSQUBRAeat0VmjDxFCuhFRy7b7OI4rSwQAEkKCiBhaJYqi1AqCoK6I8JColIdycAcA3pWsQC7VDgW6aMbkmWrB8eCgLZnjOPW0iDpibgGn03kDwzDhs1RRlApBELYNAXC++xVEWHmpTidb/57Z974vSdIizW5/f//1XV1d3dHmiQnA4XAQq9XKaUrBYPBel8v1baQRr79brXMNFUbJDjKevZerV/z+/e4fbovwnbhcLvW4vmgkDECiUhHKyvHLGZjRuerrNpxo3tYcPg6DwWAKAMjSXUiVPUadupxyGQCZFZDZApkckBZJ8KjPBd/3tEXNfzmWHLg/rxxusOYnPT+mRRI8T/1wx5FHoDd40WuCcMB2Sw7smfgJ5FpykgohLQCogd96+AHdwL4peR/YEcW6cmYE0gKA6vAbnvdgs+ejmL7Ps8+ChsI1gEn+RJk2AMzctWTKZgBkCqFMIZQphNKiEEpmYjNjK5ME0ykJquVwb6DXzA0cIuvILjRdLqfNCqjpWAdfSEPeopkGUWC7HlrIu5BvNf7mLS0AdAckmHHkIdMBR1PYXFgH99jDbQa6NtMCgAIKzDlaAafls7oOxxNQy+RdJVtNPS+kBQA1qE7/39As7b4kAJNHlkB57kxTNtIGgCmvkyicAZBOx2ASb6xhU5kVkFkBSXgaLCkpKVZ7bbR1N/zboJTOX4ZWrz/Z/PmOCZrviqI4BUFwRdtDMb8NFhQUXGe329XWs9BQFOVJQRA+1v5OZwA1z7/094+te8Zqvvp8vvyTJ09eaFgcNuJ2iBBCehAxV9WhlK7leX7F1QCgYsETfcfdovaqOcBxXMzmbL0WmR0AoHU3HuI47uYwAL80BUE5YDg1XyZBz+kz8MA8rTciNOlejuNmx5o+LgCn0/kkwzCRr3UXcxz3jmbM6+9OeTu7WW51K9bA1zt3hdUURXleEIQ3EgJQWlqaJcvyCQAYM7gNfMFg8Ba32x1qnJD83R8gwFNmnUyV/Jfbv4K1K1+NNN/n8/kKY+1/VVC3T9DpdC5hGOZtzSqlVH26WcTz/C61Rwhk5ScEuCVVQRm1+8mHn8KbGzYNEaeUPsvz/NB/mkmCmizLsp8BQEWkLqV0OwBsav299WDeqNznAOBpxCFNikZ9T0iuv78fXLwbXLwLvm3ZDe1//jXcThPHcY/pGdddAYMGbISQTxHxET2D6XCdUvoFz/NPAEBAzx+jAFQ7DMuyjQDwjJ7RK3mdUtrA8/xStXQx4ocZACF76o8lrFbrKkrp3Yg4wsgkqZahlJ5Xu9kDgcBKt9utNnYbHqYBRFi2OZ3OaYhYRCktZBgmod8FGfZ0mCCldEB950IpPS4Ighq0sUbkRJJgok5eDXqXsgKuhvh0fcwA0EX0Pxf4Dws8WYyVxouxAAAAAElFTkSuQmCC"
          /></head
        ><title>Report</title>
        <body style="height: 100%; width: 100%">
          <div id="app" style="height: 100%; width: 100%"></div>
          <script defer="defer" src="./test-report-md/jest-html-reporters-attach/index/index.js"></script>
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
