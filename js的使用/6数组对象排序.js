let data = [
  { id: 10, value: 100 },
  { id: 2, value: 200 },
  { id: 7, value: 100 },
  { id: 5, value: 100 }
]

data.sort((b, a) => {
  return b.id - a.id
})
console.log(data)
