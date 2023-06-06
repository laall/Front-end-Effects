/**
 * @param {*} input_values input 框中输入的值
 * @returns Array  将输入的值中 1-9 组成一个数组
 */

// 将输入的值中 1-9 组成一个数组
function findNum(input_values) {
  // TODO：待补充代码
  // 需要转成Number
  return [...new Set(input_values.match(/[0-9]/g))].map(Number)
}

// 将 1-9 中三个不重复的随机数放入数组中，并返回这个数组
let randomCoin = () => {
  let randomNumArr = []
  // TODO：待补充代码
  let RanGenerator = () => Math.floor(Math.random() * 9) + 1
  let a, b, c
  while (a == b || b == c || a == c) {
    for (let i = 0; i < 3; i++) {
      a = RanGenerator()
      b = RanGenerator()
      c = RanGenerator()
    }
  }
  randomNumArr = [a, b, c]
  return randomNumArr
}

// 请勿删除和修改下面代码
try {
  module.exports = { randomCoin, findNum }
} catch (e) {}
