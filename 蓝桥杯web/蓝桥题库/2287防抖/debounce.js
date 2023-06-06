function debounce(fn, delay = 0) {
  // TODO: 在这里写入具体的实现逻辑
  // 返回一个新的防抖函数
  // 即使函数在 delay 时间段内多次被调用，也只会在最后一次函数被调用的 delay 时间结束后执行
  let timer
  return e => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(e)
    }, delay)
  }
}

module.exports = debounce // 检测需要，请勿删除
