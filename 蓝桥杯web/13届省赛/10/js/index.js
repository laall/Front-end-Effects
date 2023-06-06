let pageNum = 1; // 当前页码，默认页码1
let maxPage; // 最大页数

// TODO：待补充代码
pageLen = 5
let carlist

axios.get('./js/carlist.json').then((res) => {
  // console.log(res.data);
  carlist = res.data
  let num = carlist.length
  // console.log(num);
  maxPage = num % pageLen == 0 ? num / pageLen : ((num - num % pageLen) / pageLen + 1)
  // console.log(maxPage);
  render()
})


function render () {
  let renderContent = ''
  for (let i = (pageNum - 1) * pageLen; i < (pageNum - 1) * pageLen + pageLen && i < carlist.length; i++) {
    let item =
      `<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${carlist[i].name}</h5>
      <small>${(carlist[i].price / 100).toFixed(2)}元</small>
    </div>
    <p class="mb-1">
      ${carlist[i].description}
    </p>
  </a>
</div>`
    renderContent += item
  }
  document.querySelector('#pagination').innerText = `共${maxPage}页, 当前${pageNum}页`
  // console.log(renderContent);
  document.querySelector('.list-group').innerHTML = renderContent
  document.querySelector('#prev').className = 'page-item'
  document.querySelector('#next').className = 'page-item'
  if (pageNum == 1) {
    console.log('11111');
    document.querySelector('#next').className = 'page-item'
    document.querySelector('#prev').className = 'page-item disabled'
  }
  if (pageNum == maxPage) {
    console.log('eeeee');
    document.querySelector('#prev').className = 'page-item'
    document.querySelector('#next').className = 'page-item disabled'
  }
}


// 点击上一页
let prev = document.getElementById("prev");
prev.onclick = function () {
  // TODO：待补充代码

  if (pageNum == 1) {
    return
  }
  pageNum--
  render()
  // console.log(this);
};
// 点击下一页
let next = document.getElementById("next");
next.onclick = function () {
  // TODO：待补充代码
  if (pageNum == maxPage) {
    return
  }
  pageNum++
  render()
  // console.log(this);
};
