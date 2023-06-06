const puppeteer = require("puppeteer");

(async function () {
  // 启动浏览器并访问页面
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 945 });
  await page.goto("http://0.0.0.0:8080/");

  // 手动调用createWatermark函数进行检查
  const count = 9;
  const text = "111";
  const color = "rgb(100, 200, 100)";
  const deg = 10;
  const opacity = 0.8;
  const spans = await page.evaluate(
    ({ text, color, deg, opacity, count }) => {
      const spanInfo = [];
      const spans = createWatermark(text, color, deg, opacity, count).children;
      Array.from(spans).forEach((item) => {
        spanInfo.push({
          text: item.textContent,
          color: item.style.color,
          deg: item.style.transform,
          opacity: item.style.opacity,
        });
      });
      return spanInfo;
    },
    { text, color, deg, opacity, count }
  );
  if (spans.length !== count) {
    console.log("span数量不符合要求");
    process.exit(1);
  }
  spans.forEach((span) => {
    if (
      span.color !== color ||
      span.text !== text ||
      span.opacity != opacity ||
      span.deg !== `rotate(${deg}deg)`
    ) {
      console.log("span样式不符合要求");
      process.exit(1);
    }
  });
  browser.close();
})();
