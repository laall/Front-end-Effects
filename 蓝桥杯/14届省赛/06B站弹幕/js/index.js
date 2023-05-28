const bullets = ['前方高能', '原来如此', '这么简单', '学到了', '学费了', '666666', '111111', 'workerman', '学习了', '别走，奋斗到天明']

/**
 * @description 根据 bulletConfig 配置在 videoEle 元素最右边生成弹幕，并移动到最左边，弹幕最后消失
 * @param {Object} bulletConfig 弹幕配置
 * @param {Element} videoEle 视频元素
 * @param {boolean} isCreate 是否为新增发送的弹幕，为 true 表示为新增的弹幕
 *
 */
function renderBullet(bulletConfig, videoEle, isCreate = false) {
  const spanEle = document.createElement('SPAN')
  spanEle.classList.add(`bullet${index}`)
  if (isCreate) {
    spanEle.classList.add('create-bullet')
  }
  // TODO：控制弹幕的显示颜色和移动，每隔 bulletConfig.time 时间，弹幕移动的距离  bulletConfig.speed
  spanEle.innerText = bulletConfig.value
  const { width: videoEleWidth, height: videoEleHeight } = getEleStyle(videoEle)
  let color = `RGB(${getRandomNum(255)},${getRandomNum(255)}, ${getRandomNum(255)})`

  spanEle.style.left = `${videoEleWidth}px`
  spanEle.style.top = `${getRandomNum(videoEleHeight - 100).toFixed(2)}px`
  spanEle.style.color = color

  let spanEleLeft = videoEleWidth
  videoEle.appendChild(spanEle)
  const { width: spanEleWidth } = getEleStyle(spanEle)

  let timer = setInterval(() => {
    spanEleLeft -= bulletConfig.speed
    spanEle.style.left = `${spanEleLeft + spanEleWidth >= 0 ? spanEleLeft : 0}px`
    if (bulletConfig.isHide || spanEleLeft + spanEleWidth < 0) {
      videoEle.removeChild(spanEle)
      clearInterval(timer)
    }
  }, bulletConfig.time)
}

document.querySelector('#sendBulletBtn').addEventListener('click', () => {
  // TODO:点击发送按钮，输入框中的文字出现在弹幕中
  bulletConfig.value = document.querySelector('#bulletContent').value
  if (isPlay && bulletConfig.value != '') {
    renderBullet(bulletConfig, videoEle, true)
  }
  document.querySelector('#bulletContent').value = ''
})

function getEleStyle(ele) {
  // 获得元素的width,height,left,right,top,bottom
  return ele.getBoundingClientRect()
}

function getRandomNum(end, start = 0) {
  // 获得随机数，范围是 从start到 end
  return Math.floor(start + Math.random() * (end - start + 1))
}

// 设置 index 是为了弹幕数组循环滚动
let index = 0
const videoEle = document.querySelector('#video')
// 弹幕配置
const bulletConfig = {
  isHide: false, // 是否隐藏
  speed: 5, // 弹幕的移动距离
  time: 50 // 弹幕每隔多少ms移动一次
}
let isPlay = false
let timer
document.querySelector('#vd').addEventListener('play', () => {
  isPlay = true
  bulletConfig.value = bullets[index++]
  renderBullet(bulletConfig, videoEle)
  timer = setInterval(() => {
    bulletConfig.value = bullets[index++]
    renderBullet(bulletConfig, videoEle)
    if (index >= bullets.length) {
      index = 0
    }
  }, 1000)
})

document.querySelector('#vd').addEventListener('pause', () => {
  isPlay = false
  clearInterval(timer)
})

document.querySelector('#switchButton').addEventListener('change', e => {
  if (e.target.checked) {
    bulletConfig.isHide = false
  } else {
    bulletConfig.isHide = true
  }
})
