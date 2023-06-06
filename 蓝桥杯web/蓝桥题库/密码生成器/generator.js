const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('passwordLength')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')

// generateEl.addEventListener('click', () => {
//   const length = +lengthEl.value // 获取密码长度
//   const hasLower = lowercaseEl.checked // 获取包含小写是否选中
//   const hasUpper = uppercaseEl.checked // 获取包含大写是否选中
//   const hasNumber = numbersEl.checked // 获取包含数字是否选择
//   const hasSymbol = symbolsEl.checked // 获取包含特殊字母是否选中
//   // 将随机生成的密码显示到 input 框中
//   resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length) ?? ''
// })

/**
 * @function_name generatePassword ->生成密码的函数
 * @param {*} lower 是否小写
 * @param {*} upper 是否大写
 * @param {*} number 是否是数字
 * @param {*} symbol 是否是特殊符号
 * @param {*} length 密码长度
 * @return {*} string
 */
function generatePassword(lower, upper, number, symbol, length) {
  //TODO：待补充代码
  let lowerList = []
  let upperList = []
  let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  let symbolList = '!@#$%^&*(){}[]=<>/,.'.split('')
  // !@#$%^&*(){}[]=<>/,.
  // for (let i = 33; i < 48; i++) {
  //   symbolList.push(String.fromCharCode(i));
  // }
  // for (let i = 58; i < 65; i++) {
  //   symbolList.push(String.fromCharCode(i));
  // }
  // for (let i = 81; i < 97; i++) {
  //   symbolList.push(String.fromCharCode(i));
  // }
  for (let i = 97; i < 97 + 26; i++) {
    lowerList.push(String.fromCharCode(i))
  }
  console.log(symbolList)
  for (let i = 65; i < 81; i++) {
    upperList.push(String.fromCharCode(i))
  }
  let arr = []
  if (lower) arr = [...arr, ...lowerList]
  if (upper) arr = [...arr, ...upperList]
  if (number) arr = [...arr, ...numberList]
  if (symbol) arr = [...arr, ...symbolList]
  console.log(arr)

  let res = ''
  for (let i = 0; i < length; i++) {
    res += arr[Math.floor(Math.random() * arr.length)]
    // console.log(arr[Math.floor(Math.random() * arr.length)])
  }
  return res
}

console.log(generatePassword(true, true, true, false, 10))
