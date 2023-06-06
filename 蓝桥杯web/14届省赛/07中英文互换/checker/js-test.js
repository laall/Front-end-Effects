const puppeteer = require("puppeteer");

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

(async function () {
  // 启动浏览器并访问页面
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 945 });

  // 请求拦截
  await page.setRequestInterception(true);
  let testRequest1 = false;
  let testRequest2 = false;
  page.on("request", (event) => {
    if (event.url() === "http://0.0.0.0:8080/js/all-data.json") {
      testRequest1 = true;
    } else if (event.url() === "http://0.0.0.0:8080/js/translation.json") {
      testRequest2 = true;
    }
    event.continue();
  });

  await page.goto("http://0.0.0.0:8080/");
  await wait(1000);

  const testRequest3 = await page.evaluate(() => {
    return translation["JavaScript明星项目"];
  });
  const testRequest = testRequest1 && testRequest2 && testRequest3;
  if (!testRequest) {
    console.log("需求1未通过检测");
    process.exit(1);
  }
  console.log("需求1通过检测，得5分");

  const n1 = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll(".list .item")).map(
      (e) => e.querySelector("h3").textContent
    );

    return titles[3] === "React" && titles.length === 15;
  });
  const n2 = await page.evaluate(() => {
    const btn = document.querySelector(".load-more");
    btn.click();
    btn.click();

    const titles = Array.from(document.querySelectorAll(".list .item")).map(
      (e) => e.querySelector("h3").textContent
    );

    return titles[40] === "Ant Design" && titles.length === 45;
  });
  const n3 = await page.evaluate(() => {
    const btn = document.querySelector(".load-more");
    btn.click();

    const titles = Array.from(document.querySelectorAll(".list .item")).map(
      (e) => e.querySelector("h3").textContent
    );

    return (
      titles[51] === "UnoCSS" &&
      titles.length === 60 &&
      getComputedStyle(btn).display === "none"
    );
  });
  if (!n1 || !n2 || !n3) {
    console.log("需求2检测不通过");
    process.exit(1);
  }
  console.log("需求2检测通过，得5分");

  const m1 = await page.evaluate(() => {
    const decs = Array.from(document.querySelectorAll(".list .item")).map(
      (e) => e.querySelector("p").textContent
    );

    return decs[20] === "JavaScript 3D 库。";
  });

  const m2 = await page.evaluate(() => {
    const lan = document.querySelector(".lang");
    lan.click();

    const decs = Array.from(document.querySelectorAll(".list .item")).map(
      (e) => e.querySelector("p").textContent
    );

    return decs[20] === "JavaScript 3D Library.";
  });

  if (!m1 || !m2) {
    console.log("需求3检测不通过");
    process.exit(1);
  }
  console.log("需求3检测通过，得5分");
  //关闭puppeteer
  await browser.close();
})();
