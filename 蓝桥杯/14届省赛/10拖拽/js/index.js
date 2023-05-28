/**
 * @description 模拟 ajax 请求，拿到树型组件的数据 treeData
 * @param {string} url 请求地址
 * @param {string} method 请求方式，必填，默认为 get
 * @param {string} data 请求体数据，可选参数
 * @return {Array}
 * */
async function ajax({ url, method = "get", data }) {
  let result;
  // TODO：根据请求方式 method 不同，拿到树型组件的数据
  // 当method === "get" 时，localStorage 存在数据从 localStorage 中获取，不存在则从 /js/data.json 中获取
  // 当method === "post" 时，将数据保存到localStorage 中
  if (method === "get") {
    let res;
    if (localStorage.getItem("data")) {
      result = JSON.parse(localStorage.getItem("data"));
    } else {
      data = await axios({ url, method, data });
      res = data.data;
      result = res.data;
    }
  }
  if (method === "post") {
    localStorage.setItem("data", JSON.stringify(data));
  }
  return result;
}

/**
 * @description 找到元素节点的父亲元素中类选择器中含有 tree-node 的元素节点
 * @param {Element} node 传入的元素节点
 * @return {Element} 得到的元素节点
 */
const getTreeNode = (node) => {
  let curElement = node;
  while (!curElement.classList.contains("tree-node")) {
    if (curElement.classList.contains("tree")) {
      break;
    }
    curElement = curElement.parentNode;
  }
  return curElement;
};

/**
 * @description 根据 dragElementId, dropElementId 重新生成拖拽完成后的树型组件的数据 treeData
 * @param {number} dragGrade 被拖拽的元素的等级，值为 dragElement data-grade属性对应的值
 * @param {number} dragElementId 被拖拽的元素的id，值为当前数据对应在 treeData 中的id
 * @param {number} dropGrade 放入的目标元素的等级，值为 dropElement data-grade属性对应的值
 * @param {number} dropElementId 放入的目标元素的id，值为当前数据对应在 treeData 中的id
 */
function treeDataRefresh(
  { dragGrade, dragElementId },
  { dropGrade, dropElementId }
) {
  if (dragElementId === dropElementId) return;
  // TODO：根据 `dragElementId, dropElementId` 重新生成拖拽完成后的树型组件的数据 `treeData`
  const getAndDeleteDragLabelObj = (dragElementId, data) => {
    let result;
    if (dragGrade - dropGrade > 1 || dragGrade - dropGrade < 0) return result;
    const innerFn = (dragElementId, data) => {
      data.forEach((treeObj, index, array) => {
        if (treeObj.id === Number(dragElementId)) {
          array.splice(index, 1);
          result = treeObj;
        } else {
          treeObj.children && innerFn(dragElementId, treeObj.children);
        }
      });
    };
    innerFn(dragElementId, data);
    return result;
  };
  const setDragLabelObjToTreeData = (dragLabelObj, dropElementId, data) => {
    for (let i = 0; i < data.length; i++) {
      const treeObj = data[i];
      if (treeObj.id === Number(dropElementId)) {
        if (dragGrade - dropGrade == 1) {
          treeObj.children
            ? treeObj.children.unshift(dragLabelObj)
            : (treeObj["children"] = [dragLabelObj]);
        } else if (dragGrade - dropGrade == 0) {
          data.splice(i + 1, 0, dragLabelObj);
          break;
        }
      } else {
        treeObj.children &&
          setDragLabelObjToTreeData(
            dragLabelObj,
            dropElementId,
            treeObj.children
          );
      }
    }
  };
  let dragLabelObj = getAndDeleteDragLabelObj(dragElementId, treeData);
  if (dropElementId) {
    dragLabelObj &&
      setDragLabelObjToTreeData(dragLabelObj, dropElementId, treeData);
  } else {
    treeData.unshift(dragLabelObj);
  }
}

/**
 * @description 根据 treeData 的数据生成树型组件的模板字符串，在包含 .tree-node 的元素节点需要加上 data-grade=${index}表示菜单的层级 data-index="${id}" 表示菜单的唯一id
 * @param {array} data treeData 数据
 * @param {number} grade 菜单的层级
 * @return 树型组件的模板字符串
 *
 * */
function treeMenusRender(data, grade = 0) {
  let treeTemplate = "";
  // TODO：根据传入的 treeData 的数据生成树型组件的模板字符串
  grade++;
  return data.reduce((prev, cur) => {
    let isContainChild = !!cur.children;
    return (treeTemplate += `
        <div class="tree-node"  data-grade=${grade} data-index="${cur.id}">
            <div class="tree-node-content" style="margin-left:${
              (grade - 1) * 15
            }px">
                <div class="tree-node-content-left">
                    <img src="https://static.shiyanlou.com/opcenter-fe/frontend/dist/img/icon-dragger.2c0734b.svg"  class="point-svg">
                    ${
                      cur.tag
                        ? `<span class="tree-node-tag" >${cur.tag}</span>`
                        : ""
                    }
                    <span class="tree-node-label">${cur.label}</span>
                    ${
                      isContainChild
                        ? `<img class="config-svg" src="https://static.shiyanlou.com/opcenter-fe/frontend/dist/img/icon-setting.4ab65af.svg">`
                        : ""
                    }
                </div>

                ${
                  !isContainChild
                    ? `<div class="tree-node-content-right">
                        <div class="students-count">
                            <span class="number">0人完成</span>
                            <span class="line">|</span>
                            <span class="number">0人提交报告</span>
                        </div>
                        <div class="config">
                            <img class="config-svg"
                                src="https://static.shiyanlou.com/opcenter-fe/frontend/dist/img/icon-setting.4ab65af.svg"
                                alt="">
                            <button class="doc-link">编辑文档</button>
                        </div>
                    </div>`
                    : ""
                }
            </div>
            ${
              isContainChild
                ? `<div class="tree-node-children">
                    ${isContainChild && treeMenusRender(cur.children, grade)}
                </div>`
                : ""
            }
        </div>    
        `);
  }, "");
}

let treeData; // 树型组件的数据 treeData

// 拖拽到目标元素放下后执行的函数
const dropHandler = (dragElement, dropElement) => {
  let dragElementId = dragElement.dataset.index;
  let dragGrade = dragElement.dataset.grade;
  if (dropElement) {
    let dropElementId = dropElement.dataset.index;
    let dropGrade = dropElement.dataset.grade;

    treeDataRefresh({ dragGrade, dragElementId }, { dropGrade, dropElementId });
    document.querySelector(".tree").innerHTML = treeMenusRender(treeData);
    document.querySelector("#test").innerText = treeData
      ? JSON.stringify(treeData)
      : "";
    ajax({ url: "./js/data.json", method: "post", data: treeData });
  }
};
// 初始化
ajax({ url: "./js/data.json" }).then((res) => {
  treeData = res;
  document.querySelector("#test").innerText = treeData
    ? JSON.stringify(treeData)
    : "";
  let treeEle = document.querySelector(".tree");
  treeEle.dataset.grade = 0;
  let treeTemplate = treeMenusRender(treeData);
  treeTemplate && (treeEle.innerHTML = treeTemplate);
  const mDrag = new MDrag(".tree-node", dropHandler);
  // 事件委托，按下小图标记录得到被拖拽的元素，该元素 class 包含 .tree-node
  document.querySelector(".tree").addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (
      e.target.nodeName.toLowerCase() === "img" &&
      e.target.classList.contains("point-svg")
    ) {
      let dragElement = getTreeNode(e.target);
      // MDrag类的drag方法实现拖拽效果
      mDrag.drag(e, dragElement);
    }
  });
});

/**
 * @description 实现拖拽功能的类，该类的功能为模拟 HTML5 drag 的功能
 *              鼠标按下后，监听 document 的 mousemove 和 mouseup 事件
 *              当开始拖拽一个元素后会在 body 内插入对应的克隆元素，并随着鼠标的移动而移动
 *              鼠标抬起后，移除克隆元素和 mousemove 事件，如果到达目标触发传入的 dropHandler 方法
 */
class MDrag {
  constructor(dropElementSelector, dropHandler) {
    // 目标元素的选择器
    this.dropElementSelector = dropElementSelector;
    // 拖拽到目标元素放下后执行的函数
    this.dropHandler = dropHandler;

    // 保存所有的目标元素
    this.dropBoundingClientRectArr = [];
    // 被拖拽的元素
    this._dragElement = null;
    // 拖拽中移动的元素
    this._dragElementClone = null;
    // 目标元素
    this._dropElement = null;
    // 拖拽移动事件
    this._dragMoveBind = null;
    // 拖拽鼠标抬起事件
    this._dragUpBind = null;

    this.init();
  }
  init() {
    const dropElements = document.querySelectorAll(this.dropElementSelector);
    this.dropBoundingClientRectArr = Array.from(dropElements).map((el) => {
      return { boundingClientRect: el.getBoundingClientRect(), el };
    });
  }
  dragMove(e) {
    const { pageX, pageY } = e;
    this._dragElementClone.style.left = `${e.pageX}px`;
    this._dragElementClone.style.top = `${e.pageY}px`;
    this.setMouseOverElementStyle(pageX, pageY);
  }
  dragend(e) {
    // 移动到目标元素后mouseup事件触发，删除 this._dragElementClone 元素和解除mousemove/mouseup事件
    const { pageX, pageY } = e;
    document.removeEventListener("mousemove", this._dragMoveBind);
    document.removeEventListener("mouseup", this._dragUpBind);
    if (
      Array.from(document.body.children).indexOf(this._dragElementClone) != -1
    ) {
      document.body.removeChild(this._dragElementClone);
    }
    this._dropElement = this.getActualDropElement(pageX, pageY);
    this.drop();
  }
  drag(e, dragElement) {
    this._dragElement = dragElement;
    this._dragElementClone = dragElement.cloneNode(true);
    this._dragElementClone.style.position = "absolute";
    this._dragElementClone.style.left = `${e.pageX - 20}px`;
    this._dragElementClone.style.top = `${e.pageY - 20}px`;
    this._dragElementClone.style.opacity = 0.5;
    this._dragElementClone.style.width = "800px";
    document.body.appendChild(this._dragElementClone);
    // 绑定mousemove和mouseup事件
    this._dragMoveBind = this.dragMove.bind(this);
    this._dragUpBind = this.dragend.bind(this);
    document.addEventListener("mousemove", this._dragMoveBind);
    document.addEventListener("mouseup", this._dragUpBind);
    return this;
  }
  getActualDropElement(pageX, pageY) {
    const dropAttributeArr = this.dropBoundingClientRectArr.filter(
      (obj) =>
        pageY >= obj.boundingClientRect.top &&
        pageY <= obj.boundingClientRect.top + obj.boundingClientRect.height
    );
    if (dropAttributeArr.length == 1) {
      return dropAttributeArr[0].el;
    } else if (dropAttributeArr.length > 1) {
      let temp = dropAttributeArr.reduce((prev, next) => {
        if (
          Math.abs(pageY - prev.boundingClientRect.top) <=
          Math.abs(pageY - next.boundingClientRect.top)
        ) {
          return prev;
        } else {
          return next;
        }
      });
      return temp.el;
    } else {
      return null;
    }
  }
  setMouseOverElementStyle(pageX, pageY) {
    let mousemoveEle = this.getActualDropElement(pageX, pageY);
    if (mousemoveEle) {
      this.dropBoundingClientRectArr.forEach((obj) => {
        obj.el.classList.contains("mouseover-active") &&
          obj.el.classList.remove("mouseover-active");
      });
      mousemoveEle.classList.add("mouseover-active");
    }
  }
  drop() {
    this.dropHandler && this.dropHandler(this._dragElement, this._dropElement);
    this.init();
  }
}
