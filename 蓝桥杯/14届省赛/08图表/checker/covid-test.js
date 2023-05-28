const puppeteer = require("puppeteer");

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const sameArr = (a1, a2) =>
  a1.every((e, i) => e === a2[i]) && a1.length === a2.length;

const counts = [
  100856162, 44680355, 39560482, 37446795, 36362366, 29489769, 29299166,
  25143705, 24366197, 21502402, 17042722, 13684258, 11525408, 11135105, 9963697,
  8914351, 8569095, 7561428, 7252944, 6721095, 6369442, 6336660, 5712491,
  5666050, 5557941, 5548487, 5045602, 5027790, 4766786, 4723919,
];

const countries = [
  "",
  "United States of America",
  "India",
  "France",
  "Germany",
  "Brazil",
  "Japan",
  "Korea (South)",
  "Italy",
  "United Kingdom",
  "Russian Federation",
  "Turkey",
  "Spain",
  "Viet Nam",
  "Australia",
  "Argentina",
  "Taiwan, Republic of China",
  "Netherlands",
  "Iran, Islamic Republic of",
  "Mexico",
  "Indonesia",
  "Poland",
  "Colombia",
  "Austria",
  "Ukraine",
  "Portugal",
  "Greece",
  "Chile",
  "Malaysia",
  "Israel",
  "Thailand",
];

(async function () {
  // 启动浏览器并访问页面
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 945 });

  // 请求拦截
  await page.setRequestInterception(true);
  let t1 = false;
  page.on("request", (event) => {
    if (event.url() === "http://0.0.0.0:8080/js/covid-data.json") {
      t1 = true;
    }
    event.continue();
  });

  await page.goto("http://0.0.0.0:8080/");
  await wait(1000);

  // 获取选择器元素
  const selector = await page.$("select");

  // 检查options渲染结果
  const opts = await page.evaluate((selector) => {
    return Array.from(selector.children).map((o) => o.value);
  }, selector);
  const t2 = sameArr(opts, countries);

  const p1 = t1 & t2;

  selector.select("Portugal");
  const n1 = await page.evaluate(() => {
    const title = document.querySelector(".title h2");
    const c = Array.from(document.querySelectorAll(".number")).map(
      (e) => e.textContent.match(/\d+/)[0]
    );
    return (
      title.textContent.trim() === "Portugal" &&
      c[0] === "3883" &&
      c[1] === "5557941" &&
      c[2] === "91" &&
      c[3] === "25805"
    );
  });
  selector.select("");
  const n2 = await page.evaluate(() => {
    const title = document.querySelector(".title h2");
    const c = Array.from(document.querySelectorAll(".number")).map(
      (e) => e.textContent.match(/\d+/)[0]
    );
    return title.textContent.trim() === "请选择国家" && c.every((i) => i == 0);
  });

  const p2 = n1 && n2;

  await wait(1000);

  const data = await page.evaluate(() => vm.chart?.getOption()?.series[0].data);
  const p3 = data && sameArr(data, counts);

  if (p1) {
    console.log("需求1测试通过，得5分");
  } else {
    console.log("需求1测试不通过");
  }
  if (p2) {
    console.log("需求2测试通过，得10分");
  } else {
    console.log("需求2测试不通过");
  }
  if (p3) {
    console.log("需求3测试通过，得5分");
  } else {
    console.log("需求3测试不通过");
  }
  if (!p1 || !p2 || !p3) {
    process.exit(1);
  }
  //关闭puppeteer
  await browser.close();
})();
