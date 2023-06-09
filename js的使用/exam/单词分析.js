//  单词的字母是次数

function analyze(string = 'asasdasweww') {
  let map = {}
  for (let i = 0; i < string.length; i++) {
    let ch = string[i]
    if (map.hasOwnProperty(ch)) {
      // 不能使用 if( map[ch]){} // 因为后续 map[ch]=0 导致if(map[ch])始终为false /0
      map[ch]++
    } else {
      map[ch] = 0
    }
  }
  console.log(map)
}
