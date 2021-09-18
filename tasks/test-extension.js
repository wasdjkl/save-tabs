const path = require("path");
const puppeteer = require("puppeteer");

(async () => {
  const extensionPath = path.join(`${__dirname}\\..\\dist\\debug\\chrome`);
  const browser = await puppeteer.launch({
    headless: false,
    args: [`-disable-extensions-except=${extensionPath}`],
  });
  const testUrlList = ["https://example.com", "https://www.baidu.com"];
  for (const url of testUrlList) {
    const page = await browser.newPage();
    await page.goto(url);
  }
})();
