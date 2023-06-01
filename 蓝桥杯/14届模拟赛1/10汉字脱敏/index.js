/**
 * @description:
 * @param {*} str
 * @param {*} rule
 * @param {*} symbol
 * @param {*} dealPhone
 * @return {*}
 * 第一个参数为字符串（任意字符串）。
 * 第二个参数为脱敏规则，可以是字符串，也可以是数组。
 * 第三个参数是字符串，表示用什么来占位脱敏文字（默认为：*）。
 * 第四个参数是：是否将手机号（11 位数字）进行脱敏，默认为 true（规则是：保留前三位和后三位，中间脱敏占位）。
 *
 */
const toDesensitization = (str, rules, symbol = '*', dealPhone = true) => {
  if (!str) return null
  if (!rules) return str
  if (!Array.isArray(rules)) rules = [rules]

  let ids = []
  for (const rule of rules) {
    str = str.replaceAll(rule, ($1, index) => {
      ids.push(index)
      return new Array(rule.length + 1).join(symbol)
    })
  }
  if (dealPhone) {
    str = str.replaceAll(/(1[0-9]{2})[0-9]{5}([0-9]{3})/g, (rep, a, b, index) => {
      ids.push(index)
      return a + '*****' + b
    })
  }

  return {
    ids: ids.sort((a, b) => a - b),
    newStr: str
  }
}

console.log(
  JSON.stringify(toDesensitization('开心每一天心15273773888,开心每一天心开心15273773888,每一天心', ['开心', '每'], '*', true), null)
)

module.exports = toDesensitization
