# 组课神器

## 介绍

在很多教育网站的平台上，课程的章节目录会使用树型组件呈现，为了方便调整菜单，前端工程师会为其赋予拖拽功能。本题需要在已提供的基础项目中，完成可拖拽树型组件的功能。

## 准备

```text
├── effect.gif
├── css
│   └── index.css
├── index.html
└── js
    ├── data.json
    ├── axios.min.js
    └── index.js
```

其中：

- `index.html` 是主页面。
- `js/index.js` 是需要补充代码的 `js` 文件。
- `js/data.json` 是存放数据的 json 文件。
- `js/axios.min.js` 是 axios 文件。
- `css/index.css` 是样式文件。
- `effect.gif` 是完成的效果图。

在浏览器中预览 `index.html` 页面，显示如下所示：

![初始效果](https://doc.shiyanlou.com/courses/15926/1723100/f48cd3f910fe2d8d832e5b16fc5cba1e-0)

## 目标

请在 `js/index.js` 文件中补全代码。具体需求如下：

1. 补全 `js/index.js` 文件中 `ajax` 函数，功能为根据请求方式 `method` 不同，拿到树型组件的数据并返回。具体如下：

- 当 `method === "get"` 时，判断 `localStorage` 中是否存在 `key` 为 `data` 的数据，若存在，则从 `localStorage` 中直接获取后处理为 json 格式并返回；若不存在则从 `./js/data.json`（必须使用该路径请求，否则可能会请求不到数据）中使用 ajax 获取并返回。
- 当 `method === "post"` 时，将通过参数 `data` 传递过来的数据转化为 json 格式的字符串，并保存到 `localStorage` 中，`key` 命名为 `data`。

最终返回的数据格式如下：

```js
[
    {
        "id": 1001,
        "label": "第一章 Vue 初体验",
        "children": [ ... ]
    },
    {
      "id": 1006,
      "label": "第二章 Vue 核心概念",
      "children": [
          {
              "id": 1007,
              "label": "2.1 概念理解",
              "children": [
                  {
                      "id": 1008,
                      "label": "聊一聊虚拟 DOM",
                      "tag":"文档 1"
                  },
                  ...
              ]
          },
          {
              "id": 1012,
              "label": "2.2 Vue 基础入门",
              "children": [
                  {
                      "id": 1013,
                      "label": "Vue 的基本语法",
                      "tag":"实验 6"
                  },
                  ...
              ]
          }
      ]
  }
]
```

2. 补全 `js/index.js` 文件中的 `treeMenusRender` 函数，使用所传参数 `data` 生成指定 DOM 结构的模板字符串（完整的模板字符串的 `HTML` 样例结构可以在 `index.html` 中查看），并在包含 `.tree-node` 的元素节点上加上指定属性如下：

| 属性名       | 属性值     | 描述                                                                                                         |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `data-grade` | `${grade}` | 表示菜单的层级，整数，由 `treeMenusRender` 函数的 `grade` 参数值计算获得，章节是 1，小节是 2，实验文档是 3。 |
| `data-index` | `${id}`    | 表示菜单的唯一 id，使用每层菜单数据的 `id` 字段值。                                                          |

3. 补全 `js/index.js` 文件中的 `treeDataRefresh` 函数，功能为：根据参数列表 `{ dragGrade, dragElementId }, { dropGrade, dropElementId }` 重新生成拖拽后的树型组件数据 `treeData`（`treeData` 为全局变量，直接访问并根据参数处理后重新赋值即可）。

方便规则描述，现将 `data.json` 中的数据扁平化处理，得到的数据顺序如下：

```js
[
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
  { grade: "3", label: "Vue 中的 MVVM 设计模式", id: "1011" }, // 即将被拖拽的元素节点
  { grade: "2", label: "2.2 Vue 基础入门", id: "1012" },
  { grade: "3", label: "Vue 的基本语法", id: "1013" },
  { grade: "3", label: "第一步，创建 Vue 应用实例", id: "1014" },
];
```

拖拽前后的规则说明如下：

- 情况一：若拖拽的节点和放置的节点为同级，即 `treeDataRefresh` 函数参数列表中 `dragGrade == dropGrade`，则将 `id == dragElementId`（例如：`1011`）的节点移动到 `id==dropElementId`（例如：`1008`）的节点后，作为其后第一个邻近的兄弟节点。最终生成的数据顺序如下：

```js
[
  { grade: "1", label: "第一章 Vue 初体验", id: "1001" },
  { grade: "2", label: "1.1 Vue 简介", id: "1002" },
  { grade: "3", label: "Vue 的发展历程", id: "1003" },
  { grade: "3", label: "Vue 特点", id: "1004" },
  { grade: "3", label: "一分钟上手 Vue", id: "1005" },
  { grade: "1", label: "第二章 Vue 核心概念", id: "1006" },
  { grade: "2", label: "2.1 概念理解", id: "1007" },
  { grade: "3", label: "聊一聊虚拟 DOM", id: "1008" },
  // 在目标元素节点下方插入
  { grade: "3", label: "Vue 中的 MVVM 设计模式", id: "1011" },
  { grade: "3", label: "感受一下虚拟 DOM", id: "1009" },
  { grade: "3", label: "聊一聊 MVVM 设计模式", id: "1010" },
  // 移除被拖拽的元素节点
  { grade: "2", label: "2.2 Vue 基础入门", id: "1012" },
  { grade: "3", label: "Vue 的基本语法", id: "1013" },
  { grade: "3", label: "第一步，创建 Vue 应用实例", id: "1014" },
];
```

- 情况二：若拖拽的节点和放置的节点为上下级，即 `treeDataRefresh` 函数参数列表中 `dragGrade - dropGrade == 1`，则将 `id == dragElementId`（例如：`1011`）的节点移动到 `id==dropElementId`（例如：`1002`）的节点下，并作为其第一个子节点。最终生成的数据顺序如下：

```js
[
  { grade: "1", label: "第一章 Vue 初体验", id: "1001" },
  { grade: "2", label: "1.1 Vue 简介", id: "1002" },
  // 在目标元素节点下方插入
  { grade: "3", label: "Vue 中的 MVVM 设计模式", id: "1011" },
  { grade: "3", label: "Vue 的发展历程", id: "1003" },
  { grade: "3", label: "Vue 特点", id: "1004" },
  { grade: "3", label: "一分钟上手 Vue", id: "1005" },
  { grade: "1", label: "第二章 Vue 核心概念", id: "1006" },
  { grade: "2", label: "2.1 概念理解", id: "1007" },
  { grade: "3", label: "聊一聊虚拟 DOM", id: "1008" },
  { grade: "3", label: "感受一下虚拟 DOM", id: "1009" },
  { grade: "3", label: "聊一聊 MVVM 设计模式", id: "1010" },
  // 移除被拖拽的元素节点
  { grade: "2", label: "2.2 Vue 基础入门", id: "1012" },
  { grade: "3", label: "Vue 的基本语法", id: "1013" },
  { grade: "3", label: "第一步，创建 Vue 应用实例", id: "1014" },
];
```

最终效果可参考文件夹下面的 gif 图，图片名称为 `effect.gif` （提示：可以通过 VS Code 或者浏览器预览 gif 图片）。

## 规定

- 请勿修改 `js/index.js` 文件外的任何内容。
- 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径、class 名、id 名、图片名等，以免造成无法判题通过。

## 判分标准

- 完成目标 1，得 5 分。
- 完成目标 2，得 10 分。
- 完成目标 3，得 10 分。
