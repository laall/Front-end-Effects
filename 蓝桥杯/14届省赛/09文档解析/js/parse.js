class Parser {
  constructor() {
    this.heading = /^(#{1,6}\s+)/
    this.hr = /^(\*{3,}|-{3,})/
    this.blockQuote = /^(\>\s+)/
    this.unorderedList = /^((\*|-){1}\s+)/
    this.image = /\!\[(.*?)\]\((.*?)\)/g
    this.strongText = /\*{2}(.*?)\*{2}/g
    this.codeLine = /\`{1}(.*?)\`{1}/g
  }

  parseLineText(lineText) {
    this.lineText = lineText
  }

  isEmptyLine() {
    return this.lineText === ''
  }
  parseEmptyLine() {
    return '<br/>'
  }

  isHeading() {
    return this.heading.test(this.lineText)
  }

  parseHeading() {
    const temp = this.lineText.split(' ')
    const headingLevel = temp[0].length
    const title = temp[1].trim()
    return `<h${headingLevel}>${title}</h${headingLevel}>`
  }

  isUnorderedList() {
    return this.unorderedList.test(this.lineText)
  }

  parseUnorderedList() {
    const tempStr = this.lineText.replace(this.unorderedList, '')
    return '<li>' + tempStr + '</li>'
  }

  isHr() {
    return this.hr.test(this.lineText)
  }

  parseHr() {
    return '<hr>'
  }

  isBlockQuote() {
    return this.blockQuote.test(this.lineText)
  }

  parseBlockQuote() {
    const tempStr = this.lineText.replace(this.blockQuote, '')
    return '<p>' + tempStr + '</p>'
  }

  isImage() {
    return this.image.test(this.lineText)
  }

  parseImage(str) {
    return str.replace(this.image, (result, str1, str2) => {
      return '<img src="' + str2 + '" alt="' + str1 + '">'
    })
  }

  isStrongText() {
    return this.strongText.test(this.lineText)
  }

  parseStrongText(str) {
    return str.replace(this.strongText, (result, str1) => {
      return '<b>' + str1 + '</b>'
    })
  }

  isCodeLine() {
    return this.codeLine.test(this.lineText)
  }

  parseCodeLine(str) {
    return str.replace(this.codeLine, (result, str1) => {
      return '<code>' + str1 + '</code>'
    })
  }

  inlineParse() {
    let str = this.lineText

    //代码行
    if (this.isCodeLine()) {
      str = this.parseCodeLine(str)
    }
    //图片
    if (this.isImage()) {
      str = this.parseImage(str)
    }
    //粗体
    if (this.isStrongText()) {
      str = this.parseStrongText(str)
    }
    return str
  }
}

class Reader {
  constructor(text) {
    //获取全部原始文本
    this.text = text
    this.lines = this.getLines()
    this.parser = new Parser()
  }

  runParser() {
    let currentLine = 0
    let hasParsed = []
    let tempStr = ''

    while (!this.reachToEndLine(currentLine)) {
      //获取行文本
      this.parser.parseLineText(this.getLineText(currentLine))

      //判断空白行
      if (this.parser.isEmptyLine()) {
        currentLine++
        continue
      }

      //判断标题
      if (this.parser.isHeading()) {
        hasParsed.push(this.parser.parseHeading())
        currentLine++
        continue
      }

      //判断分隔符
      if (this.parser.isHr()) {
        hasParsed.push(this.parser.parseHr())
        currentLine++
        continue
      }

      //判断引用区块
      if (this.parser.isBlockQuote()) {
        const tempParsed = ['<blockquote>']

        while (this.parser.isBlockQuote()) {
          tempParsed.push(this.parser.parseBlockQuote())

          currentLine++
          this.parser.parseLineText(this.getLineText(currentLine))
        }
        tempParsed.push('</blockquote>')
        hasParsed.push(...tempParsed)
        continue
      }

      //判断无序列表
      if (this.parser.isUnorderedList()) {
        const tempParsed = ['<ul>']
        while (this.parser.isUnorderedList()) {
          tempParsed.push(this.parser.parseUnorderedList())
          currentLine++
          this.parser.parseLineText(this.getLineText(currentLine))
        }

        tempParsed.push('</ul>')
        hasParsed.push(...tempParsed)
        continue
      }

      tempStr = this.parser.inlineParse()
      hasParsed.push(tempStr)
      currentLine++
    }
    return hasParsed.join('')
  }

  getLineText(lineNum) {
    return this.lines[lineNum]
  }

  getLines() {
    this.lines = this.text.split('\n')
    return this.lines
  }

  reachToEndLine(line) {
    return line >= this.lines.length
  }
}

module.exports = function parseMarkdown(markdownContent) {
  return new Reader(markdownContent).runParser()
}
