/*
函数柯里化是一种技术，一种将 多入参函数 变成 单入参函数。
方法返回方法 调用时类似于: func(1)(2)(3,4)
(延迟执行)
*/
const getUri = (protocol, hostname, pathname) => `${protocol}${hostname}${pathname}`

let uri = getUri('http://', 'localhost:8080', '/index.html')
console.log(uri)

// function getUriNoProtocolAndHostname (pathname) {
//   return getUri('http://', 'localhost:8080', pathname)
// }

function uri_curring(protocol) {
  return function uri_https(hostname, pathname) {
    return `${protocol}${hostname}${pathname}`
  }
}
const uri_https = uri_curring('http://')
console.log(uri_https('localhost:8080', '/index.html'))
console.log(uri_https('localhost:8080', '/login.html'))
console.log(uri_https('localhost:8080', '/login.html'))

// 不定数量的函数内部函数
// add(1)(2)(3)(4)(5)(6) --> 1+2+3+4+5+6=21
function add() {
  let args = Array.prototype.slice.call(arguments)
  console.log([...arguments])
  let inner = function () {
    //或 let inner = (...arguments) => {
    console.log([...arguments])
    args = args.concat([...arguments])
    // console.log(args)
    return inner
  }
  inner.toString = () => {
    return args.reduce((prev, next) => {
      return prev + next
    }, 0)
  }
  return inner
}
console.log('add:', add(1)(2)(3, 4)(5, 6, 7, 8, 9)(10).toString())

console.log(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((prev, next) => {
    return prev + next
  }, 0)
)

//
//函数柯里化封装（这个封装可以直接复制走使用）
function curry(fn, args) {
  var length = fn.length
  var args = args || []
  return function () {
    newArgs = args.concat(Array.prototype.slice.call(arguments))
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}

//需要被柯里化的函数
function multiFn(a, b, c) {
  return a * b * c
}

//multi是柯里化之后的函数
var multi = curry(multiFn)
console.log(multi(2)(3)(4))
console.log(multi(2, 3, 4))
console.log(multi(2)(3, 4))
console.log(multi(2, 3)(4))
