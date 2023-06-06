function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j]
      }
    }
  }
}
// 用map
function twoSum2(nums, target) {
  let map = new Map()
  for (const [index, v] of nums.entries()) {
    if (map.has(v)) {
      return [map.get(v), index]
    } else {
      map.set(target - v, index)
    }
  }
}
console.log(twoSum2([2, 7, 11, 15], 9))
//  [2,7,11,15], target = 9

module.exports = twoSum
