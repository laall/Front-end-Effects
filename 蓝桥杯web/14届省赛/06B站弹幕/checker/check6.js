const puppeteer = require("puppeteer");
const failTipsCollectAndLog = (arr, tip) => {
  if (!arr.includes(tip)) {
    arr.push(tip);
  }
};

(async () => {
  try {
    const testFailTipArr = [];
    const sleep = function (times) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, times);
      });
    };
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    // 本地测试
    // const browser = await puppeteer.launch({
    //     headless: false
    // });

    const page = await browser.newPage();
    // 本地测试
    // await page.goto("http://127.0.0.1:5501/答案/test6/", {
    //     waitUntil: "networkidle0", //不在有网络连接时候触发
    // });

    await page.setViewport({ width: 1200, height: 750 });
    await page.goto("http://127.0.0.1:8080/", {
      waitUntil: "networkidle0", //不在有网络连接时候触发
    });
    const videoRect = await page.$eval("#video", (el) => {
      const { width, height } = el.getBoundingClientRect();
      return {
        width,
        height,
      };
    });

    await sleep(1000);
    await page.click("#vd");
    await sleep(300);
    let startBulletPos = await page.$eval("#video>span", (el) => {
      return {
        left: parseInt(el.style.left),
        top: parseInt(el.style.top),
      };
    });

    if (
      startBulletPos.left < videoRect.width ||
      startBulletPos.top > videoRect.height
    ) {
      failTipsCollectAndLog(
        testFailTipArr,
        "测试不通过,初始位置 left 或 top 未正确设置"
      );
    }
    await sleep(startBulletPos.left * 10 + 50);

    let leftAfter = await page.$eval("#video>span", (el) =>
      parseInt(el.style.left)
    );

    if (leftAfter > 0) {
      failTipsCollectAndLog(
        testFailTipArr,
        "测试不通过，未正确设置 speed 和 time 或者 弹幕最右端未到视频左端提前移除"
      );
    }
    await sleep(1000);
    let bullets = await page.$$eval("#video>span", (els) =>
      Array.from(els).map((el) => el.className)
    );

    if (bullets[0] === "bullet1") {
      failTipsCollectAndLog(
        testFailTipArr,
        "测试不通过，未移除已经不再视频前出现的弹幕"
      );
    }

    await page.type("#bulletContent", "666");
    await page.click("#sendBulletBtn");
    await sleep(300);

    let isIncludeCreateBullet = await page.$$eval("#video>span", (els) =>
      Array.from(els)
        .map((el) => el.classList.contains("create-bullet"))
        .reduce((prev, next) => prev || next)
    );
    if (!isIncludeCreateBullet) {
      failTipsCollectAndLog(
        testFailTipArr,
        "测试不通过,未检测到输入框输入的弹幕，或者弹幕样式未正确设置"
      );
    }

    if (testFailTipArr.length > 0) {
      testFailTipArr.forEach((tip) => console.log(tip));
      process.exit(1);
    } else {
      console.log("测试通过");
    }

    await browser.close();
  } catch (err) {
    console.log("测试不通过", "未获取到弹幕");
    process.exit(1);
  }
})();
