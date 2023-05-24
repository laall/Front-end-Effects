{
  let dog = {
    name: '闷墩儿'
  }
  var proxy = new Proxy(dog, {
    get(target, propKey) {
      // 遍历目标对象的属性键值
      if (propKey in target) {
        return target[propKey] // 返回相应的属性值
      } else {
        throw new ReferenceError(propKey + ' 属性不存在')
      }
    }
  })
  console.log('访问 dog 对象中的 name 属性值为：' + proxy.name)
  console.log('访问不存在的 age 属性：' + proxy.age)
}

{
  let dog = {
    name: '闷墩儿',
    age: 2
  }
  let handler = {
    has(target, propKey) {
      if (propKey == 'age' && target[propKey] < 5) {
        console.log(`${target.name}的年龄小于 5 岁哦！`)
        return true
      }
    }
  }
  let proxy = new Proxy(dog, handler)

  console.log('age' in proxy)
}

{
  let dog = {
    name: '闷墩儿',
    age: 2,
    food: '狗罐头'
  }
  const proxy = new Proxy(dog, {
    ownKeys() {
      return ['name', 'color']
    }
  })

  for (let key in proxy) {
    console.log(key) // 输出 name
    {
    }
  }
}
{
}
