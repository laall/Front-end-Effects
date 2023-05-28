/**
 * 创建一个文字水印的div
 * @param  {string} text - 水印文字
 * @param  {string} color - 水印颜色
 * @param  {number} deg - 水印旋转角度
 * @param  {number} opacity - 水印透明度
 * @param  {number} count - 水印数量
 */
function createWatermark(text, color, deg, opacity, count) {
  // 创建水印容器
  const container = document.createElement("div");
  container.className = "watermark";

  // TODO: 根据输入参数创建文字水印
  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.innerText = text;
    item.style.color = color;
    item.style.opacity = opacity;
    item.style.transform = `rotate(${deg}deg)`;
    container.appendChild(item);
  }

  return container;
}

// 以下代码不需要修改
// 调用createWatermark方法，创建图片水印
const watermark = createWatermark("WaterMark", "white", 45, 0.5, 11);
// 将水印挂载到图片容器上
const container = document.querySelector(".container");
container.appendChild(watermark);

// 提供图片保存功能
const button = document.querySelector("button");
button.addEventListener("click", () => {
  domtoimage.toJpeg(document.querySelector(".container")).then((dataUrl) => {
    const link = document.createElement("a");
    link.download = "image.jpeg";
    link.href = dataUrl;
    link.click();
  });
});
