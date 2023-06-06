const puppeteer = require("puppeteer");
const BlinkDiff = require("blink-diff");

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 50,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 600 });

  // await page.goto("http://127.0.0.1:5501/index.html", {
  //   waitUntil: "load", //不再有网络连接时候触发
  // });
  await page.goto("http://127.0.0.1:8080/index.html", {
    waitUntil: "networkidle0", //不再有网络连接时候触发
  });

  await page.waitForTimeout(3000);

  await executeDiff(page, "04-body", "PC端布局对比不通过");

  await page.setViewport({ width: 800, height: 2000 });
  await page.waitForTimeout(1000);
  await executeDiff(page, "04-body-mobile", "Mobile端布局对比不通过");

  await page.waitForTimeout(1000);
  const button = await page.$(".menu-btn.icon-menu");
  await button.click();
  await page.waitForTimeout(1000);
  const dropdown = await page.$(".dropdown");
  await dropdown.hover();
  await page.waitForTimeout(1000);
  await executeDiff(
    page,
    "04-body-mobile-open",
    "Mobile端，打开Menu后，图片对比不通过"
  );

  //关闭puppeteer
  await browser.close();
})().catch((err) => {
  console.error(`检测未通过，原因是：${err}`);
  process.exit(1);
});

const executeDiff = async (page, name, error) => {
  const container = await page.$("body");
  await container.screenshot({
    path: `${__dirname}/${name}.png`,
  });

  const diff = new BlinkDiff({
    imageAPath: `${__dirname}/${name}.png`,
    imageBPath: `${__dirname}/${name}.target.png`,
    threshold: 0.02,
    imageOutputPath: `${__dirname}/${name}.diff.png`,
  });

  const result = await diff.runWithPromise();
  if (result.differences / result.dimension > 0.2) {
    console.log(result.differences / result.dimension);
    throw new Error(error);
  }
};
