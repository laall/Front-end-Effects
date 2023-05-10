crypto.randomUUID()
const { v4: uuidv4 } = require('uuid')
const uuid = uuidv4() // 生成一个随机的UUID
console.log(uuid)
// 这些库生成的随机字符串只包括十六进制数字和字母。

// 生成哈希值
const hash = crypto.createHash('sha256').update('hello').digest('hex')

const { nanoid } = require('nanoid')
// 生成一个长度为10的随机字符串
const randomString = nanoid(10)
console.log(randomString)
const customUuid = `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(12)}`
console.log(customUuid)
