// 初始化省份下拉列表内容
function provinceInit() {
  var province = document.getElementById('param_province')
  province.length = provinces.length
  for (var i = 0; i < provinces.length; i++) {
    province.options[i].text = provinces[i]
    province.options[i].value = provinces[i]
  }
}

// 选择省份后对应城市下拉列表内容渲染
function provincechange() {
  // TODO：请补充代码实现功能
  let province = document.getElementById('param_province')
  let city = document.getElementById('param_city')
  let selectedCities = citys[province.selectedIndex]
  city.length = selectedCities.length
  for (var i = 0; i < selectedCities.length; i++) {
    city.options[i].text = selectedCities[i]
    city.options[i].value = selectedCities[i]
  }
}

/**
 * 为标签绑定单击事件。
 * 事件效果为：
 * 1、鼠标点击该标签后该标签样式显示 class=active；
 * 2、其他已选标签的 active 样式被移除；
 * 3、将选中的标签对应下标（即选择器为 “mark a” 选中的标签对应的下标）更新到 id=param_mark 的隐藏的 input 中。
 */
function addClick() {
  // TODO：请补充代码实现功能
  let input = document.querySelector('#param_mark')
  let labels = document.querySelectorAll('.mark a')
  for (const [index, label] of labels.entries()) {
    label.onclick = () => {
      for (const label of labels) {
        label.className = ''
      }
      input.value = index
      label.className = 'active'
    }
  }
}
// 提交信息后，读取并显示在页面中
function saveInfo() {
  // TODO：请补充代码实现功能
  let param_address = document.querySelector('#param_address')
  let param_name = document.querySelector('#param_name')
  let param_phone = document.querySelector('#param_phone')

  if (param_address.value == '' || param_name.value == '' || param_phone.value == '') {
    let dialog = document.querySelector('.warning-dialog')
    dialog.style.display = 'block'
    return
  }
  let addressList = document.querySelector('.address-list')
  document.querySelector('.address').style.display = 'none'
  document.querySelector('.user-info').style.display = 'none'
  document.querySelector('#main_title').innerText = '地址管理'

  let inputIndex = document.querySelector('#param_mark').value
  let label = []
  if (inputIndex == 0) {
    label[0] = 'home'
    label[1] = '家'
  }
  if (inputIndex == 1) {
    label[0] = 'company'
    label[1] = '公司'
  }
  if (inputIndex == 2) {
    label[0] = 'school'
    label[1] = '学校'
  }

  let province = document.getElementById('param_province')
  let city = document.getElementById('param_city')

  let li = `<li><div class="show-area">
   <label class="${label[0]}">${label[1]}</label>
   <span>${province.value}${city.value}</span>
 </div>
 <div class="show-address">
   <span>${param_address.value}</span>
   <a><img src="./images/edit.png" /></a>
 </div>
 <div class="show-info">
   <span>${param_name.value}</span>
   <span>${param_phone.value}</span>
 </div></li>`
  addressList.innerHTML = li + addressList.innerHTML

  addressList.style.display = 'block'
}

// 切换新增地址和地址管理的显隐
function back() {
  if (document.getElementById('main_title').innerHTML == '地址管理') {
    document.getElementById('main_title').innerHTML = '新增地址'
    document.querySelector('.address-list').style.display = 'none'
    document.querySelector('.address').style.display = 'block'
    document.querySelector('.user-info').style.display = 'block'
  }
}
// 页面加载后的初始化操作
function init() {
  // 初始化省份下拉列表内容
  provinceInit()
  // 为标签绑定单击事件
  addClick()
}

window.onload = function () {
  // 初始化
  init()
}
