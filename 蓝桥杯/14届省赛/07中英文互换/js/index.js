let translation = {};
const data = [];
// 记录当前展示的项目数量
let cursor = 15;
// 记录当前语言
let currLang = "zh-cn";

// 请求项目数据，展示前50个
$.ajax({
  url: "./js/all-data.json",
  success: (result) => {
    data.push(...result);
    data.slice(0, 15).forEach((item) => {
      $(".list > ul").append(
        createItem({ ...item, description: item.descriptionCN })
      );
    });
  },
});

// 请求翻译数据
$.ajax({
  url: "./js/translation.json",
  success: (result) => {
    translation = result;
  },
});

// 用户点击加载更多时
$(".load-more").click(() => {
  console.log(data.length);
  if (cursor < data.length) {
    data.slice(cursor, (cursor += 15)).forEach((item) => {
      $(".list > ul").append(
        createItem({
          ...item,
          description:
            currLang === "zh-cn" ? item.descriptionCN : item.descriptionEN,
        })
      );
    });
  }
  if (cursor === data.length) {
    $(".load-more").hide();
  }
});

$(".lang").click(() => {
  if (currLang === "en") {
    $(".lang").text("中文");
    currLang = "zh-cn";
  } else {
    $(".lang").text("English");
    currLang = "en";
  }
  $(".list > ul").empty();
  data.slice(0, cursor).forEach((item) => {
    $(".list > ul").append(
      createItem({
        ...item,
        description:
          currLang === "zh-cn" ? item.descriptionCN : item.descriptionEN,
      })
    );
  });
  $("body")
    .find("*")
    .each(function () {
      const text = $(this).text().trim();
      if (translation[text]) {
        $(this).text(translation[text]);
      }
    });
});

function createItem({ name, description, tags, stars, icon }) {
  return `
    <li class="item">
      <img src="images/${icon}" alt="">
      <div class="desc">
        <h3>${name}</h3>
        <p>${description}</p>
        <ul class="labels">
          ${tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
      </div>
      <div class="stars">
        +${stars} 🌟
      </div>
    </li>
  `;
}
