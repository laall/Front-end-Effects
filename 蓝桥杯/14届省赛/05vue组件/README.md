# 外卖给好评

## 介绍

外卖是现代生活中必备的一环。收到外卖后，各大平台软件常常会邀请用户在口味，配送速度等多个方面给与评分。在 element-ui 组件中，已经有相应的 Rate 组件，但是已有组件只能对单一维度进行评分，在外卖评分这种场景中，样式基本上是固定的，功能也基本一样。若每写一个页面都要去复制一份类似代码，就会产生大量重复的代码，既不利于后期的维护，代码也不够简洁。为此需要前端工程师对 element-ui 的原 Rate 组件进行二次封装。

## 准备

开始答题前，需要先打开本题的项目代码文件夹，目录结构如下：

```txt
├── element-ui-2.6.2
│   ├── element-icons.ttf
│   ├── element-icons.woff
│   ├── element-ui.min.js
│   └── element-ui.style.css
├── index.html
├── js
│   ├── http-vue-loader.js
│   └── vue.min.js
├── my-rate.vue
└── effect.gif
```

其中：

- `index.html` 是主页面。
- `element-ui-2.6.2` 文件夹中存放的是 element-ui 库相关的脚本文件、样式文件及字体。
- `js` 文件夹中存放的是 vue 及 http-vue-loader 库相关文件。
- `my-rate.vue` 是待封装的评分组件文件。
- `effect.gif` 是完成后的效果图。

在浏览器中预览 `index.html` 页面，显示如下所示：

![初始效果](https://doc.shiyanlou.com/courses/14311/1723100/8385a6da6a61a5e93a1fe9bcdade9a3b-0)

## 目标

请在 `my-rate.vue` 文件中补充代码，具体要求如下：

1. `my-rate.vue` 组件能够对不同的维度进行评分。
2. `my-rate.vue` 组件对外抛出 `change` 事件，在三项评分均完成后，触发 `change` 事件，`change` 事件包含一个参数，用于传递改变后的分数值，其类型是对象，包含以下属性：

```ts
{
  speed: number;
  flavour: number;
  pack: number;
}
```

最终效果可参考文件夹下面的 gif 图，图片名称为 effect.gif（提示：可以通过 VS Code 或者浏览器预览 gif 图片）。

![完成效果](https://doc.shiyanlou.com/courses/14311/1604305/1ddbd88dfcc9bbbeace6a681e34493cb-0)

实现该功能所需的 `el-rate` 组件 api 如下：

| 参数               | 说明                                                   | 类型                      | 默认值 |
| ------------------ | ------------------------------------------------------ | ------------------------- | ------ |
| value/v-model      | 绑定值                                                 | number                    | 0      |
| show-score         | 是否显示当前分数，show-score 和 show-text 不能同时为真 | boolean                   | false  |
| change(event 事件) | 分值改变时触发，参数是改变后的分值                     | (changed: object) => void |        |

## 规定

- 请勿修改 `my-rate.vue` 文件外的任何内容。
- 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径、class 名、id 名、图片名等，以免造成无法判题通过。

## 判分标准

- 完全实现题目目标得满分，否则得 0 分。
