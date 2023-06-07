// 原理:通过调用 Object对象 的toString()方法来间接调用
Object.prototype.toString.call(111) // '[object Number]'
Object.prototype.toString.call(111).slice(8, -1).toLowerCase() // '[object Number]'
//
;(211).toString()
;({}).toString.call(111)
// 这两个为什么结果不一样
// 这两个表达式的结果不同，是因为它们所调用的toString()方法不同。
// 对于第一个表达式(211).toString()，它是将数字211转换为字符串类型，因此它调用的是Number对象的toString()方法，返回的结果是字符串"211"。

// 而对于第二个表达式({}).toString.call(111)，它是将数字111作为参数传递给一个空对象{}，然后调用该对象的toString()方法。
// 由于该对象是一个空对象，它调用的是Object对象的toString()方法，返回的结果是"[object Number]"，表示传递给它的参数是一个数字类型。

// 需要注意的是，这里使用了函数调用的方式来调用toString()方法，即通过调用对象的toString()方法来间接调用。这种方式可以确保正确地调用对象的toString()方法，而不是调用全局的toString()方法。

// 类似的用法  '123456789'转成 ['1','2','3','4','5','6','7','8','9'] 再执行slice(1,8)
Array.prototype.slice.call('123456789', 1, 8)
;[].slice.call('123456789', 1, 8)
