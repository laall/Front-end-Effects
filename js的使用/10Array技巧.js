const { flatMap, isArray } = require('lodash')

//生成n个*
{
  let n = 10,
    symbol = '*'
  let s = new Array(n + 1).join(symbol)
  console.log(s)
}

// 生成0到100
{
  Array.from({ length: 101 }, (item, index) => index)
  Array.from(Array(101), (item, index) => index)
  Array.from(Array(101).keys())
  // arr.splice(0, 1) // 去0
  Array.from({ length: 100 }, (_, index) => 1 + index) // 1-> 100
}
// 数组扁平化
{
  let arr = [1, 2, 3, 4, [7, 9, 11, 5, [1, 5, 44, 8]]]
  let res = []
  // 法1
  const flat = arr => {
    if (Array.isArray(arr)) {
      for (const item of arr) {
        flat(item)
      }
    } else res.push(arr)
  }
  // flat(arr)
  // console.log(res.sort((a, b) => a - b))

  // 法2
  function flatDeepToString(arr) {
    let result = []
    // '1,2,3,4,7,9,11,5,1,5,44,8'.split(',').map(Number)
    return (result = arr.toString().split(',').map(Number))
  }
  // console.log(flatDeep(arr))

  // 法三
  function flatDeepReduce(arr) {
    return arr.reduce(function (pre, next) {
      if (Array.isArray(next)) return pre.concat(flatDeep(next))
      return pre.concat(next)
    }, [])
  }
  // 法四
  function flatDeepSome(arr) {
    while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr)
    }
    return arr
  }
  //法五
  var arr = [1, [2, [3, [4, 5]]]]
  function flatDeep(arr) {
    return arr.flat(Infinity)
  }
  console.log(flatDeep(arr))
}
