const data_list = [
  { name: '江苏', value: 192836 },
  { name: '安徽', value: 118491 },
  { name: '湖北', value: 117036 }
]

let vals = []
for (let item of data_list) {
  // vals.push(Object.values(item)[1])
  // vals.push(item['value'])
  vals.push(item.value)
}
console.log(vals)
// 推荐以下两种
console.log(Array.from(data_list, ({ value }) => value))

console.log(data_list.map(item => item.value))
