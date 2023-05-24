/*
 * @param {*}  左侧输入框输入的值转化成的 js 数据
 * @return {*} 根据传入的数据生成对应的 js 格式数据
 */
let generateData = data => {
  // TODO：待补充代码
  console.log(data)
  let jsonList = []
  let repeatNum = 1
  const getJson = data => {
    let json = { ...data }
    for (const key in json) {
      if (Object.hasOwnProperty.call(json, key)) {
        const element = json[key]
        if (typeof element === 'string') {
          // let reg = /{{(\w+)\(\)}}/
          if (/{{bool\(\)}}/.test(element)) {
            json[key] = Math.random() > 0.5
          }
          if (/{{integer\((\w+),(\w+)\)}}/.test(element)) {
            let matchArr = element.match(/{{integer\((\w+),(\w+)\)}}/)
            json[key] = Math.floor(Number(matchArr[1]) + Math.random() * (matchArr[2] - matchArr[1] + 1))
          }
        }
      }
    }
    return json
  }
  if (data instanceof Array) {
    let repeatMatchArr = data[0].match(/{{repeat\((\w+),(\w+)\)}}/)
    repeatNum = Math.floor(Number(repeatMatchArr[1]) + Math.random() * (repeatMatchArr[2] - repeatMatchArr[1] + 1))
    for (let i = 0; i < repeatNum; i++) {
      jsonList.push(getJson(data[1]))
    }
  } else {
    return getJson(data)
  }
  return jsonList
}

module.exports = { generateData }
