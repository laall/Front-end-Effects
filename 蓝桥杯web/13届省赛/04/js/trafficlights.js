// TODO：完善此函数 显示红色颜色的灯
function red () {
  let defaultlight = document.querySelector('#defaultlight')
  let redlight = document.querySelector('#redlight')
  setTimeout(() => {
    defaultlight.style.display = 'none'
    redlight.style.display = 'inline-block'
  }, 3000);
}

// TODO：完善此函数  显示绿色颜色的灯
function green () {
  let redlight = document.querySelector('#redlight')
  let greenlight = document.querySelector('#greenlight')
  setTimeout(() => {
    redlight.style.display = 'none'
    greenlight.style.display = 'inline-block'
  }, 6000);
}

// TODO：完善此函数
function trafficlights () {
  red()
  green()
}

trafficlights();
