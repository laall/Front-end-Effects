const { bind } = require('lodash')

let obj = { id: 1 }
function f(...param) {
  console.log(this, param + '' + this.id)
}
// f('param') // global globalThis
// 传参不同

f.call(obj, 'param', 'param2')
f.apply(obj, ['param1', 'param2'])
// f.bind(obj)

function call(fn, obj, ...args) {
  obj.temp = fn
  obj.temp(args)
  delete obj.temp
}
call(f, obj, 'param')
