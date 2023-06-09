/**
 * @param {Object} oldArr
 * @param {Object} num
 * */
const splitArray = (oldArr, num) => {
  // TODO：请补充代码实现功能
  var arr = oldArr.sort((a, b) => a - b)
  const len = oldArr.length

  if (len <= num) {
    return arr
  }
  const pnum = Math.ceil(len / num)
  // console.log(len);
  // console.log(num);
  // console.log(pnum);
  let res = []
  for (let i = 0; i < pnum; i++) {
    let r1 = []

    for (let j = i * num; j < i * num + num && j < len; j++) {
      r1.push(arr[j])
    }
    res.push(r1)
  }
  return res
}
module.exports = splitArray // 检测需要，请勿删除
