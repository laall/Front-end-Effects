# 年度明星项目

## 介绍

作为前端开发的主力语言，`JavaScript` 相关的开源项目是每一个前端开发者都应该多多关注的。我们可以通过这一年新增 star 的数量来判断一个开源项目的流行趋势。

本题请实现一个展示 2022 年 `JavaScript` 明星开源项目数据的网页。

## 准备

开始答题前，需要先打开本题的项目代码文件夹，目录结构如下：

```txt
├── css
│   └── style.css
├── effect.gif
├── images
├── index.html
└── js
    ├── all-data.json
    ├── index.js
    ├── jquery-3.6.0.min.js
    └── translation.json
```

其中：

- `css/style.css` 是样式文件。
- `index.html` 是主页面。
- `images` 是图片文件夹。
- `js/all-data.json` 是项目数据文件。
- `js/index.js` 是需要补充代码的 `js` 文件。
- `js/translation.json` 是页面所用到的翻译数据。
- `effect.gif` 是页面最终的效果图。

在浏览器中预览 `index.html` 页面效果如下：

![初始效果](https://doc.shiyanlou.com/courses/uid2370472-20230118-1674035230123)

## 目标

请在 `js/index.js` 文件中补全代码，具体需求如下：

1. 在页面初始化时使用 `AJAX` 请求地址为 `./js/all-data.json` 以及 `./js/translation.json` 文件中的数据（必须使用给定的路径请求，否则可能会请求不到数据），并将后者中的数据保存至 `translation` 变量中。其中 `all-data.json` 文件中以数组的形式存储了明星项目的数据，`translation.json` 文件中包含了网站中英文转换所需的数据。

   - `all-data.json` 数据参数说明

   | 参数            | 说明               | 类型   |
   | --------------- | ------------------ | ------ |
   | `name`          | 项目名称           | string |
   | `icon`          | 项目 icon 路径     | string |
   | `stars`         | 项目新增 star 数量 | number |
   | `descriptionCN` | 项目中文描述       | number |
   | `descriptionEN` | 项目英文描述       | number |
   | `tags`          | 项目标签列表       | number |

2. 页面初始化时利用 `createProjectItem` 函数创建前 15 个项目数据（即 `all-data.json` 数组中的前 15 项）的列表元素并加载到页面中。当用户点击 **加载更多** 按钮时，则按顺序再显示 15 个项目数据。直到所有项目数据都展示完毕（共 60 个）。所有项目展示完毕后需要隐藏 **加载更多** 按钮。项目展示效果如图所示：

   ![项目展示效果](https://doc.shiyanlou.com/courses/uid2370472-20230118-1674036369332)

3. 当用户点击页面右上方的中英文切换按钮时，根据用户的选择改变项目描述使用的语言（不改变原有项目展示数量）。当用户选择英语模式时的项目展示效果如图所示：

   ![中英文切换效果](https://doc.shiyanlou.com/courses/uid2370472-20230118-1674036581441)

最终效果可参考文件夹下面的 gif 图，图片名称为 effect.gif（提示：可以通过 VS Code 或者浏览器预览 gif 图片）。

## 规定

- 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径、class 名、id 名、图片名等，以免造成无法判题通过。

## 判分标准

- 完成目标 1，得 5 分。
- 完成目标 2，得 5 分。
- 完成目标 3，得 5 分。
