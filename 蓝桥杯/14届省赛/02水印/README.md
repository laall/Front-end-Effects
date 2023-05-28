# 图片水印生成

## 介绍

很多网站都会通过给图片添加水印的形式来标记图片来源，维护版权。前端生成水印通常是通过 `canvas` 实现，但实际上我们也可以直接利用 `CSS` 来实现图片水印，这样做会有更好的浏览器兼容性。

本题中你将封装一个创建文字水印的函数。

## 准备

开始答题前，需要先打开本题的项目代码文件夹，目录结构如下：

```txt
├── css
│   └── style.css
├── images
│   └── origin.png
├── index.html
└── js
    ├── dom-to-image.js
    └── index.js
```

其中：

- `index.html` 是主页面。
- `css` 文件夹用于存放页面的 `CSS` 文件。
- `js/index.js` 是待补充代码的 `js` 文件。
- `js/dom-to-image.js` 是生成图片的第三方库，此文件无需修改。
- `images/origin.png` 是项目中的原始图片文件。

在浏览器中预览 `index.html` 页面效果如下所示：

![初始效果](https://doc.shiyanlou.com/courses/uid2370472-20230211-1676047911417)

## 目标

现在需要我们完善 `js/index.js` 文件中的 TODO 部分，实现创建水印函数的功能 ，创建的水印需要使用 `<span>` 标签展示。补充完整后最终的运行效果如下：

![完成效果](https://doc.shiyanlou.com/courses/uid2370472-20230211-1676047931959)

- `createWatermark` 参数说明

  | 参数      | 说明     | 类型   |
  | --------- | -------- | ------ |
  | `text`    | 文字内容 | string |
  | `color`   | 颜色值   | string |
  | `deg`     | 旋转角度 | number |
  | `opacity` | 透明度   | number |
  | `count`   | 水印数量 | number |

## 规定

- 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径、`id` 、`class` 、DOM 结构、以及函数名等，以免造成无法判题通过。

## 判分标准

- 本题完全实现题目目标得满分，否则得 0 分。
