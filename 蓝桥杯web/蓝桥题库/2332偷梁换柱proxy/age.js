// 请不要更改这个对象里面的内容
let person = {
  age: 0
}
// TODO:在这里写入具体的实现逻辑
// 对 person 的 age 属性更新行为进行拦截
// 如果输入的年龄在 0 - 150 之间，则认为是合法
// 否则，如果小于 0，则返回 0；如果大于 150，则返回 150
// Proxy
person = new Proxy(person, {
  set(target, prop, value) {
    if (value > 150) value = 150
    if (value < 0) value = 0
    target[prop] = value
    console.log(target, prop, value)
  }
})

//  //Object.defineProperty
// let ageVal = 0
// Object.defineProperty(person, 'age', {
//   set(a) {
//     if (a > 150) a = 150
//     if (a < 0) a = 0
//     return (ageVal = a)
//   },
//   get() {
//     return ageVal
//   }
// })
module.exports = person // 检测需要，请勿删除
