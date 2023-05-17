const { BigNumber } = require('bignumber.js')
const { calc } = require('a-calc')

console.log(eval('0.1+0.2'))
console.log(0.1 + 0.2)

console.log(BigNumber(0.1).plus(BigNumber(0.2)).toFixed())
console.log(calc('0.1+0.2'))
