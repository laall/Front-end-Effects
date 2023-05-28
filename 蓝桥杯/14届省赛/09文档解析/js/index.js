const fs = require('fs')
const path = require('path')

const htmlFilePath = path.join(__dirname, '../index.html')
const html = fs.readFileSync(htmlFilePath, { encoding: 'utf8' })

const markdownFilePath = path.join(__dirname, '../docs.md')
const markdownContent = fs.readFileSync(markdownFilePath, { encoding: 'utf8' })

function executeParse() {
  delete require.cache[require.resolve('./parse')]
  const parse = require('./parse')
  const result = parse(markdownContent)
  fs.writeFileSync(htmlFilePath, html.replace(/<body>.*<\/body>/, `<body>${result}</body>`))
}

executeParse()
