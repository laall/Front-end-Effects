/**
 * @description: 数据类型检测
 * @param {*} data 传入的待检测数据
 * @return {*} 返回数据类型
 */
function getType(data) {
  // TODO：待补充代码

  // 方式1(推荐)
  // return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()

  // 方式2(推荐)
  if (typeof data != 'object') return typeof data
  if (data instanceof Array) return 'array'
  if (data instanceof Date) return 'date'
  if (data instanceof Map) return 'map'
  if (data instanceof Set) return 'set'
  if (data instanceof RegExp) return 'regExp'
  if (data == null) return 'null'
  return 'object'
}

module.exports = {
  getType
}

// 示例
const testArr = ['s', 0, false, undefined, Symbol(), function () {}, 123n, null, {}, [], new Date(), new Map(), new Set(), /a/]
const result = testArr.map(item => getType(item))
console.log('得到的结果：', result)
/*
得到的结果：
 [
    'string',  'number',
    'boolean', 'undefined',
    'symbol',  'function',
    'bigint',  'null',
    'object',  'array',
    'date',    'map',
    'set',     'regExp'
  ]
*/
