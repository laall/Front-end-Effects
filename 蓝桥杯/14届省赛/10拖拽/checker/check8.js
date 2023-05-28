const puppeteer = require("puppeteer");
const sleep = function (times) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, times);
  });
};
const failTipsCollectAndLog = (arr, tip) => {
  if (!arr.includes(tip)) {
    arr.push(tip);
  }
};
let score = 0;
const getAjaxDataId = (treeData) => {
  let temp = [];
  function fn(data) {
    data.forEach((item) => {
      temp.push(item.id);
      if (item.children) {
        fn(item.children);
      }
    });
    return temp;
  }
  return fn(treeData);
};

function getType(data) {
  let type = typeof data;
  if (type === "object") {
    type = Object.prototype.toString
      .call(data)
      .replace(/^\[object (\S+)\]$/, "$1");
  }
  return type;
}
// 测试一维数组
const isArrEqual = (ansArr, testArr) => {
  if (getType(testArr) !== "Array") return false;
  if (ansArr.length !== testArr.length) return false;
  let isEqual = true;
  ansArr.forEach((val, index) => {
    if (val != testArr[index]) {
      isEqual = false;
    }
  });
  return isEqual;
};

const getFlatTreeArr = async (page, testFailCb) => {
  return await page.$eval(".tree", (el) => {
    const flatTreeNode = (nodeChild) => {
      const tempArr = [];
      function fn(nodes) {
        Array.from(nodes).forEach((node) => {
          let index = node.dataset.index;
          let grade = node.dataset.grade;
          let treeNodeChildren;
          let label;
          try {
            let treeNodeChildrenParent = document.querySelector(
              `.tree-node[data-index="${index}"] >.tree-node-children`
            );
            if (!treeNodeChildrenParent) {
              treeNodeChildren = document.querySelectorAll(
                `.tree-node[data-index="${index}"] >.tree-node`
              );
            } else {
              treeNodeChildrenParent.children.length > 0 &&
                (treeNodeChildren = treeNodeChildrenParent.children);
            }
            label = document.querySelector(
              `.tree-node[data-index="${index}"] >.tree-node-content .tree-node-label`
            ).innerText;
          } catch (error) {
            console.log(error);
          }
          tempArr.push({
            grade,
            label,
            id: index,
          });
          if (treeNodeChildren.length > 0) {
            fn(treeNodeChildren);
          }
        });
        return tempArr;
      }
      return fn(nodeChild);
    };
    return flatTreeNode(el.children);
  });
};

const isTreeFlatEqual = (treeFlatDataAns, treeFlatDataTest) => {
  // console.log("🚀 ~ file: check8.js:149 ~ treeDataArrAns, ", JSON.stringify(treeFlatDataAns));
  // console.log("🚀 ~ file: check8.js:149 ~ , treeDataArrTest", JSON.stringify(treeFlatDataTest));
  let result = true;
  treeFlatDataAns.forEach((value, index) => {
    if (!treeFlatDataTest[index]) {
      result = false;
    } else if (
      !isArrEqual(
        Object.values(treeFlatDataAns[index]),
        Object.values(treeFlatDataTest[index])
      )
    ) {
      result = false;
    }
  });
  return result;
};

(async () => {
  try {
    const testFailTipArr = [];
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    // 本地测试
    // const browser = await puppeteer.launch({
    //     headless: false
    // });

    const page = await browser.newPage();
    // 本地测试
    // await page.goto("http://127.0.0.1:5501/答案/test8/", {
    //     waitUntil: "networkidle0", //不在有网络连接时候触发
    // });

    await page.setViewport({ width: 1200, height: 750 });
    await page.goto("http://127.0.0.1:8080/", {
      waitUntil: "networkidle0", //不在有网络连接时候触发
    });
    const draggableLens = await page.$$eval(
      "[draggable='true']",
      (els) => els.length
    );
    if (draggableLens > 0) {
      console.log("测试不通过", "禁止使用HTML5 drag");
      process.exit(1);
    }
    const treeData = await page.$eval(
      "#test",
      (el) => el.innerText && JSON.parse(el.innerText)
    );
    const idTest = treeData && getAjaxDataId(treeData);
    const idArrAns = [
      1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012,
      1013, 1014,
    ];
    let isStep11Pass = false;
    // console.log("idArrAns, idTest", JSON.stringify(idArrAns), JSON.stringify(idTest))
    if (!isArrEqual(idArrAns, idTest)) {
      failTipsCollectAndLog(
        testFailTipArr,
        "需求1测试不通过，未正确通过 ajax 获取数据"
      );
    } else {
      isStep11Pass = true;
    }
    const treeDataArrAns = [
      { grade: "1", label: "第一章 Vue 初体验", id: "1001" },
      { grade: "2", label: "1.1 Vue 简介", id: "1002" },
      { grade: "3", label: "Vue 的发展历程", id: "1003" },
      { grade: "3", label: "Vue 特点", id: "1004" },
      { grade: "3", label: "一分钟上手 Vue", id: "1005" },
      { grade: "1", label: "第二章 Vue 核心概念", id: "1006" },
      { grade: "2", label: "2.1 概念理解", id: "1007" },
      { grade: "3", label: "聊一聊虚拟 DOM", id: "1008" },
      { grade: "3", label: "感受一下虚拟 DOM", id: "1009" },
      { grade: "3", label: "聊一聊 MVVM 设计模式", id: "1010" },
      { grade: "3", label: "Vue 中的 MVVM 设计模式", id: "1011" },
      { grade: "2", label: "2.2 Vue 基础入门", id: "1012" },
      { grade: "3", label: "Vue 的基本语法", id: "1013" },
      { grade: "3", label: "第一步，创建 Vue 应用实例", id: "1014" },
    ];
    // 检测 `treeMenusRender` 函数功能，场景为初始化树型组件
    const treeDataArrTest = await getFlatTreeArr(page, () => {
      failTipsCollectAndLog(testFailTipArr, "需求2测试不通过,树型组件未渲染");
    });
    // console.log("🚀 ~ file: check8.js:145 ~ treeDataArrTest", JSON.stringify(treeDataArrTest))
    if (treeDataArrTest.length === 3) {
      failTipsCollectAndLog(testFailTipArr, "需求2测试不通过,树型组件未渲染");
    } else {
      // console.log("🚀 ~ file: check8.js:149 ~ treeDataArrAns, ", JSON.stringify(treeDataArrAns));
      // console.log("🚀 ~ file: check8.js:149 ~ , treeDataArrTest", JSON.stringify(treeDataArrTest));
      if (isTreeFlatEqual(treeDataArrAns, treeDataArrTest)) {
        console.log("需求2测试通过,得分：", `10`);
      } else {
        failTipsCollectAndLog(
          testFailTipArr,
          "需求2测试不通过，树型组件未正确渲染"
        );
      }
    }

    // 检测拖拽功能
    const testDrag = async (dragElementId, dropElementId) => {
      try {
        const dragElementPosTest1 = await page.$eval(
          `.tree-node[data-index='${dragElementId}'] .point-svg`,
          (el) => {
            let pos = el.getBoundingClientRect();
            return {
              top: Number(pos.top),
              left: Number(pos.left),
            };
          }
        );
        const dropElementPosTest1 = await page.$eval(
          `.tree-node[data-index='${dropElementId}']`,
          (el) => {
            let pos = el.getBoundingClientRect();
            return {
              top: Number(pos.top),
              left: Number(pos.left),
            };
          }
        );
        // console.log(dragElementPosTest1, dropElementPosTest1);

        await page.mouse.move(
          dragElementPosTest1.left + 5,
          dragElementPosTest1.top + 5
        );
        await page.mouse.down();
        await sleep(500);
        await page.mouse.move(
          dropElementPosTest1.left,
          dropElementPosTest1.top
        );
        await page.mouse.move(
          dropElementPosTest1.left + 5,
          dropElementPosTest1.top + 5
        );
        await page.mouse.up();
      } catch (error) {
        // failTipsCollectAndLog(testFailTipArr, '需求3测试不通过,请确认拖拽功能');
      }
    };
    // test1 : 情况1：同级菜单拖拽功能测试，将 实验5：Vue 中的 MVVM 设计模式 移动到 聊一聊虚拟 DOM 下面

    await testDrag(1011, 1008);
    await sleep(10);
    const treeDataArrDragTest = await page.$$eval(".tree-node-label", (els) =>
      Array.from(els).map((el) => el.innerText)
    );
    // console.log("🚀 ~ file: check8.js:206 ~ treeDataArrDragTest",JSON.stringify(treeDataArrDragTest))
    const treeDataArrDragAns = [
      "第一章 Vue 初体验",
      "1.1 Vue 简介",
      "Vue 的发展历程",
      "Vue 特点",
      "一分钟上手 Vue",
      "第二章 Vue 核心概念",
      "2.1 概念理解",
      "聊一聊虚拟 DOM",
      "Vue 中的 MVVM 设计模式",
      "感受一下虚拟 DOM",
      "聊一聊 MVVM 设计模式",
      "2.2 Vue 基础入门",
      "Vue 的基本语法",
      "第一步，创建 Vue 应用实例",
    ];
    let isStep31Pass = false;
    if (isArrEqual(treeDataArrDragAns, treeDataArrDragTest)) {
      isStep31Pass = true;
    } else {
      failTipsCollectAndLog(
        testFailTipArr,
        "需求3测试不通过,请确认 需求3情况1 拖拽后treeData是否正确刷新"
      );
    }
    // test2 : 情况2：拖拽的节点和放置的节点为上下级，将 实验5：Vue 中的 MVVM 设计模式 移动到 1.1 Vue 简介 下面
    await testDrag(1011, 1002);
    await sleep(10);
    const treeDataArrDragTest2 = await page.$$eval(".tree-node-label", (els) =>
      Array.from(els).map((el) => el.innerText)
    );
    const treeDataArrDragAns2 = [
      "第一章 Vue 初体验",
      "1.1 Vue 简介",
      "Vue 中的 MVVM 设计模式",
      "Vue 的发展历程",
      "Vue 特点",
      "一分钟上手 Vue",
      "第二章 Vue 核心概念",
      "2.1 概念理解",
      "聊一聊虚拟 DOM",
      "感受一下虚拟 DOM",
      "聊一聊 MVVM 设计模式",
      "2.2 Vue 基础入门",
      "Vue 的基本语法",
      "第一步，创建 Vue 应用实例",
    ];
    let isStep32Pass = false;
    if (isArrEqual(treeDataArrDragAns2, treeDataArrDragTest2)) {
      isStep32Pass = true;
    } else {
      failTipsCollectAndLog(
        testFailTipArr,
        "需求3测试不通过,请确认 需求3情况2 拖拽后treeData是否正确刷新"
      );
    }
    if (isStep31Pass && isStep32Pass) {
      console.log("需求3测试通过,得分：", `10`);
    }
    // const treeDataArrDragTest = await getFlatTreeArr(page, () => {
    //     failTipsCollectAndLog(testFailTipArr, '需求2测试不通过,树型组件未渲染');
    // });
    // const treeDataArrDragAns = [
    //     { grade: '1', label: '第一章 Vue 初体验', id: '1001' },
    //     { grade: '2', label: '1.1 Vue 简介', id: '1002' },
    //     { grade: '3', label: 'Vue 的发展历程', id: '1003' },
    //     { grade: '3', label: 'Vue 特点', id: '1004' },
    //     { grade: '3', label: '一分钟上手 Vue', id: '1005' },
    //     { grade: '1', label: '第二章 Vue 核心概念', id: '1006' },
    //     { grade: '2', label: '2.1 概念理解', id: '1007' },
    //     { grade: '3', label: '聊一聊虚拟 DOM', id: '1008' },
    //     { grade: '3', label: 'Vue 中的 MVVM 设计模式', id: '1011' },
    //     { grade: '3', label: '感受一下虚拟 DOM', id: '1009' },
    //     { grade: '3', label: '聊一聊 MVVM 设计模式', id: '1010' },
    //     { grade: '2', label: '2.2 Vue 基础入门', id: '1012' },
    //     { grade: '3', label: 'Vue 的基本语法', id: '1013' },
    //     { grade: '3', label: '第一步，创建 Vue 应用实例', id: '1014' }
    // ];
    // if (treeDataArrDragTest.length === 3) {
    //     failTipsCollectAndLog(testFailTipArr, '需求3测试不通过,树型组件未渲染');
    // } else {
    //     if (isTreeFlatEqual(treeDataArrDragAns, treeDataArrDragTest)) {
    //         console.log('需求3测试通过,得分：', `10`);
    //     } else {
    //         failTipsCollectAndLog(testFailTipArr, '需求3测试不通过,请确认拖拽后数据是否正确刷新');
    //     }
    // }

    // 测试拖拽后数据是否存入 localStorage  中
    let a = await page.click(".header");
    await sleep(10);
    const localStorageData = await page.$eval("body", () => {
      return JSON.parse(localStorage.getItem("data"));
    });
    // console.log("localStorageData", JSON.stringify(localStorageData))
    let isStep12Pass = false;
    if (localStorageData) {
      isStep12Pass = true;
    } else {
      failTipsCollectAndLog(
        testFailTipArr,
        "需求1测试不通过,拖拽后调用 ajax 请求，数据未存入 localStorage  中"
      );
    }
    if (isStep11Pass && isStep12Pass) {
      console.log("需求1测试通过,得分：", `5`);
    }
    if (testFailTipArr.length > 0) {
      testFailTipArr.forEach((tip) => console.log(tip));
      process.exit(1);
    } else {
      console.log("测试通过");
    }
    await browser.close();
  } catch (error) {
    console.log("测试不通过", error);
    process.exit(1);
  }
})();
