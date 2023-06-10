$(function () {
  // 使用 ajax 获取 userList.json 数据并渲染到页面
  getData()

  // 为按钮添加事件
  $('#add').click(function () {
    // TODO：补充代码，实现功能
    // $('#leftSelect').remove()
    changeAccess(true, $('#leftSelect').val())
  })
  $('#addAll').click(function () {
    // TODO：补充代码，实现功能
    const lis = []
    $('#leftSelect option').each((i, j) => {
      lis.push(j.value)
    })
    changeAccess(true, lis)
  })
  $('#remove').click(function () {
    // TODO：补充代码，实现功能
    changeAccess(false, $('#rightSelect').val())
  })
  $('#removeAll').click(function () {
    // TODO：补充代码，实现功能
    const lis = []
    $('#rightSelect option').each((i, j) => {
      lis.push(j.value)
    })
    changeAccess(false, lis)
  })
})

/**
 * 修改权限
 * @param {Object} right 要修改的权限
 * @param {Object} changeList 要修改权限的用户列表
 */
function changeAccess(right, changeList) {
  // TODO：补充代码，实现功能
  if (right) {
    for (const item of changeList) {
      $('#rightSelect').append(`<option value="${item}">${item}</option>`)
    }
    $('#leftSelect option').each((i, j) => {
      if (changeList.indexOf(j.value) > -1) {
        $(j).remove()
      }
    })
  } else {
    for (const item of changeList) {
      $('#leftSelect').append(`<option value="${item}">${item}</option>`)
    }
    $('#rightSelect option').each((i, j) => {
      if (changeList.indexOf(j.value) > -1) {
        $(j).remove()
      }
    })
  }
  $('#userList td').each((i, j) => {
    if (changeList.indexOf(j.innerText) > -1) {
      $(j)
        .siblings()
        .text(right ? '管理员' : '普通用户')
    }
  })
}
// 异步获取数据
function getData() {
  // TODO：补充代码，实现功能
  $.get('./js/userList.json').then(data => {
    for (const item of data) {
      $('#userList').append(` <tr>
    <td>${item.name}</td>
    <td>${item.right ? '管理员' : '普通用户'}</td>
  </tr>`)
    }
  })
}
