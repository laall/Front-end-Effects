function mentalMethod(...args) {
  // TODO 待补充代码
  return (...s) => (s.length ? mentalMethod(...args, ...s) : '战胜' + args.join(','))
}
// 函数柯西化 参数改造
console.log(mentalMethod('峨眉')('武当')('少林')())
console.log(mentalMethod('峨眉', '武当')('少林')())
console.log(mentalMethod('峨眉', '武当', '少林')())
// '战胜峨眉,武当,少林'
