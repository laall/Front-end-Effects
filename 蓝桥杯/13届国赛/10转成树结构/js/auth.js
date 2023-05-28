// menuList 仅为示例数据，非实际使用数据，实际使用数据层级不确定（可能是四级五级六级等），数据结构与 menuList 一致
// 1. `parentId` 如果为 `-1`，则表示此条数据为顶级数据。
// 2. `parentId` 为该条数据的父级数据的 `id`。

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

/**
 * @param {*} menuList 传入的数据
 * @return {*} menus 转化后的树形结构数据，auths 转化后的权限列表数组
 */

const getMenuListAndAuth = menList => {
  // TODO：待补充代码

  let menus = []
  let auths = menuList.map(item => item.auth)
  // 组装
  var f = m => {
    let children = menuList.filter(item => item.parentId === m.id)
    m.children = children
    for (const item of children) {
      f(item)
    }
  }
  menus.push(...menuList.filter(item => item.parentId === -1))
  for (const item of menus) {
    f(item)
  }
  console.log(menus)

  return { menus, auths } // menus 转化后的树形结构数据，auths 转化后的权限列表数组
}

// 请勿删除和修改以下代码
try {
  module.exports = { getMenuListAndAuth }
} catch (e) {}
