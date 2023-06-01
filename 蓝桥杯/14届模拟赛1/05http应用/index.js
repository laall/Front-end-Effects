// TODO: 待补充代码
const http = require('http')
const server = http.createServer((req, res) => {
  res.end('hello world')
})

// server.on('request', (req, res) => {
//   res.end('hello world')
// })
server.listen('8080', () => {
  console.log('server on 8080!')
})
