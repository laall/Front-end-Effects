const puppeteer = require("puppeteer");

let browser;

(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 50,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto("http://127.0.0.1:8080/", {
    waitUntil: "load",
  });
  // await page.goto(
  //   "http://127.0.0.1:5500/challenge-2/03-takeaway-score/code/index.html",
  //   {
  //     waitUntil: "load",
  //   }
  // );
  await page.waitForTimeout(3000);

  const allSliders = await page.$$("li [role=slider]");
  if (allSliders.length !== 3) {
    throw new Error("应该包含 3 个评分项");
  }
  // 送餐
  await updateScore(page, allSliders[0], 2);
  await checkResult(page, {}, "评分尚未结束，不应该触发 change 回调");
  // 口味
  await updateScore(page, allSliders[1], 4);
  await checkResult(page, {}, "评分尚未结束，不应该触发 change 回调");

  // 包装
  await updateScore(page, allSliders[2], 5);
  await checkResult(page, { speed: 2, flavour: 4, pack: 5 });

  // 包装
  await updateScore(page, allSliders[2], 4);
  await checkResult(page, { speed: 2, flavour: 4, pack: 4 });

  await browser.close();
  process.exit(0);
})().catch((err) => {
  if (browser) {
    browser.close();
  }
  console.error(err);
  process.exit(1); // 结束进程，检测失败
});

const updateScore = async (page, selector, i) => {
  const element = await selector.$(`.el-rate__item:nth-of-type(${i})`);
  await element.click();
  await page.waitForTimeout(1000);
  const text = await selector.$(".el-rate__text");
  const score = await (await text.getProperty("textContent")).jsonValue();

  if (score !== i.toString()) {
    throw new Error("点击评分后，当前评分项分数未更新");
  }
};

const checkResult = async (
  page,
  expect,
  msg = "完成评分后，应该触发 change 回调"
) => {
  const text = await page.$(".result");
  const result = await (await text.getProperty("textContent")).jsonValue();
  if (result !== `评分结果：${JSON.stringify(expect)}`) {
    throw new Error(msg);
  }
};
