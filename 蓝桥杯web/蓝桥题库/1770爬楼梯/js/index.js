const climbStairs = n => {
  // 1. 递归
  // 可以使用递归来实现，具体思路如下：
  // 当阶梯数为 0 时，只有 0 种方法；当阶梯数为 1 时，只有 1 种方法；当阶梯数为 2 时，只有 2 种方法
  // ，所以当阶梯数 n 小于等于 2 时，可以直接返回值。
  // 如果阶梯数大于 2，就递归。
  if (n < 3) {
    return n
  }
  return climbStairs(n - 1) + climbStairs(n - 2)
}
// 0 1 2 3
console.log(climbStairs(10))

const climbStairsByDP = n => {
  // 2. 动态规划
  // 可以使用动态规划来实现，具体思路如下：
  // 当阶梯数 n 为 0 时，直接返回 0。
  // 当阶梯数 n 为 1 时，直接返回 1。
  // 当阶梯数大于 1 时，假设有 i 阶梯子需要爬，就有 dp[i] 中方法。
  // 3 阶以上的梯子，都满足一个规律：dp[i] = dp[i-1] + dp[i-2]。

  var dp = [0, 1, 2]
  if (n >= 3) {
    for (var i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
    }
  }
  return dp[n]
}

module.exports = climbStairs
