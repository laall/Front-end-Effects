const inputs = document.querySelectorAll('.controls input')

/**
 * 上面已经选取了两个取色器
 * 请添加相应的 JS 事件处理函数并绑定到合适的事件监听器上（提示：change 事件）
 * 这样我们就可以用取色器选取颜色来生成下方的渐变色背景啦
 *  */
let gradient = document.querySelector('.gradient')
let leftColor = '#00dbde'
let rightColor = '#fc00ff'
inputs[0].addEventListener('change', e => {
  leftColor = e.target.value
  console.log(`linear-gradient(45deg, ${leftColor}, ${rightColor});`)
  console.log(gradient.style)
  gradient.style.background = `linear-gradient(45deg, ${leftColor}, ${rightColor})`
  // 字符串末尾不能加';'符号
  // background: linear-gradient(45deg, var(--color1), var(--color2))
})
// inputs[1].addEventListener('input', e => {
inputs[1].addEventListener('change', e => {
  rightColor = e.target.value
  console.log(`linear-gradient(45deg, ${leftColor}, ${rightColor});`)
  gradient.style.background = `linear-gradient(45deg, ${leftColor}, ${rightColor})`
  // background: linear-gradient(45deg, var(--color1), var(--color2))
})
