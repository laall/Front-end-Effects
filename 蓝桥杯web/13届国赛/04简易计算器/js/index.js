// TODO：请补充代码
const $ = selector => document.querySelector(selector)

// console.log(new Function('a', 'b', 'return a+b')(1, 50))
const formula = $('#formula')
const result = $('#result')
formula.value = ''
let calc = ''
result.value = ''
let hasPoint = false
const addSymbol = (innerText, sym) => {
  hasPoint = false
  formula.value += innerText
  calc += sym
}

for (const btn of document.querySelectorAll('.calc-button')) {
  btn.onclick = () => {
    formula.value += btn.innerText
    calc += btn.innerText
  }
}

$('#add').onclick = e => addSymbol(e.target.innerText, '+')
$('#reduce').onclick = e => addSymbol(e.target.innerText, '-')
$('#multiply').onclick = e => addSymbol(e.target.innerText, '*')
$('#division').onclick = e => addSymbol(e.target.innerText, '/')
$('#sqrt').onclick = e => {
  let res = Math.sqrt(eval(calc))
  result.value = Number.isInteger(res) ? res : 'NaN'
}
$('#decimal').onclick = e => {
  if (hasPoint) {
    return
  }
  hasPoint = true
  formula.value += e.target.innerText
  calc += '.'
}
$('#equal').onclick = () => {
  console.log(calc)
  let res = eval(calc)
  result.value = res
  // 简单处理一下溢出
  if ((res + '').indexOf('.') > -1 && (res + '').split('.')[1].length > 8) {
    result.value = res.toFixed(2)
  }
}
$('#reset').onclick = e => {
  hasPoint = false
  formula.value = ''
  calc = ''
  result.value = ''
}
