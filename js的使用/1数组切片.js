let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let res = []
let p = 3 // 3个一组

for (let i = 0; i < arr.length;) {
  res.push(arr.slice(i, i += p))
}
console.log(res);
/*
[
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ],
  [ 10, 11, 12 ],
  [ 13, 14, 15 ]
]
*/

const _ = require('lodash');
console.log(_.chunk(arr , 3)); 