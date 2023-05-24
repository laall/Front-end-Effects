let menuList = [
  { parentId: -1, name: '添加管理员', id: 10, auth: 'admin' },
  { parentId: 10, name: '管理员权限分配', id: 11, auth: 'admin-auth' },
  { parentId: -1, name: '商品管理', id: 1, auth: 'product' },
  { parentId: 1, name: '商品列表', id: 4, auth: 'productList' },
  { parentId: 4, name: '商品分类', id: 5, auth: 'category' },
  { parentId: 5, name: '添加分类', id: 8, auth: 'addClassification' },
  { parentId: 4, name: '商品上架', id: 6, auth: 'product' },
  { parentId: -1, name: '评论管理', id: 2, auth: 'comments' },
  { parentId: -1, name: '个人中心', id: 3, auth: 'profile' }
]
// console.log(menuList.sort((a, b) => a.parentId - b.parentId))

// 递归
{
  var f = m => {
    let children = menuList.filter(item => item.parentId === m.id)
    if (children.length) {
      m.children = children
      for (const item of children) {
        f(item)
      }
    }
  }
  let menus = []
  menus.push(...menuList.filter(item => item.parentId === -1))
  for (const menu of menus) {
    f(menu)
  }
  console.log(menus)
}
// 多次调用 最多三层,三层已经很多了
{
  let menus = []
  menus.push(...menuList.filter(item => item.parentId === -1))
  for (const m1 of menus) {
    let c1 = menuList.filter(menu => menu.parentId === m1.id)
    if (c1.length) {
      m1.children = c1

      for (const m2 of c1) {
        let c2 = menuList.filter(menu => menu.parentId === m2.id)
        if (c2.length) {
          m2.children = c2

          for (const m3 of c2) {
            let c3 = menuList.filter(menu => menu.parentId === m3.id)
            if (c3.length) {
              m3.children = c3
            }
          }
        }
      }
    }
  }
  console.log(menus)
}
