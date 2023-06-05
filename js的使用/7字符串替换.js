let str ='12ssss2s2s2ss1s2s6666s66s99w99ww99e7r'

let symbol='*'
str=str.replaceAll('ss', ($1, index) => {
  return new Array('ss'.length + 1).join(symbol)
})
console.log(str);

