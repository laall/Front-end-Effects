const puppeteer = require("puppeteer");
const BlinkDiff = require("blink-diff");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto("http://127.0.0.1:8080/index.html", {
    waitUntil: "networkidle0", //不再有网络连接时候触发
  });

  await page.waitForTimeout(3000);
  // 清除所有 alert 防止卡住
  page.evaluate(() => (alert = null));

  const container = await page.$("body");

  await container.screenshot({
    path: `${__dirname}/body.png`,
  });

  const diff = new BlinkDiff({
    imageAPath: `${__dirname}/body.png`,
    imageBPath: `${__dirname}/body.target.png`,
    threshold: 0.02,
    imageOutputPath: `${__dirname}/diff.png`,
  });

  const result = await diff.runWithPromise();
  if (result.differences / result.dimension > 0.02) {
    throw "检测未通过，原因是：图片对比不通过";
  }

  //关闭puppeteer
  await browser.close();
})().catch((err) => {
  console.error(`检测未通过，原因是${err}`);
  process.exit(1);
});
