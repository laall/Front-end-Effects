# 全球新冠疫情数据统计

## 介绍

新冠疫情席卷全球，在此期间有很多免费的 API 和网站为人们提供了各个国家疫情数据的查询功能，这些免费公开的数据体现出了互联网作为信息媒介的优越性，帮助全球人民更好的了解一线疫情信息。

本题请实现一个可以对各个国家的新冠疫情数据统计的页面。

## 准备

开始答题前，需要先打开本题的项目代码文件夹，目录结构如下：

```txt
├── css
│   └── style.css
├── effect.gif
├── index.html
└── js
    ├── axios.js
    ├── covid-data.json
    ├── echarts.min.js
    └── vue.js
```

其中：

- `css/style.css` 是样式文件。
- `index.html` 是主页面。
- `js/axios.js` 是 axios 文件。
- `js/vue.min.js` 是 vue2.x 文件。
- `js/echarts.min.js` 是 echarts 文件。
- `js/covid-data.json` 是页面所用到的新冠数据。
- `effect.gif` 是页面最终的效果图。

在浏览器中预览 `index.html` 页面效果如下：

![初始效果](https://doc.shiyanlou.com/courses/uid2370472-20230212-1676213286444)

## 目标

请在 `index.html` 文件中补全代码，具体需求如下：

1. 在组件加载时利用 axios 请求地址为 `./js/covid-data.json` （必须使用该路径请求，否则可能会请求不到数据） 文件中的数据。并将所有国家名称在 `select` 标签下的 `option` 元素进行渲染（保留默认选项 “Select Country”），效果如下：

![国家名称下拉框效果](https://doc.shiyanlou.com/courses/uid2370472-20230212-1676213964092)

`covid-data.json` 数据参数说明

| 参数             | 说明     | 类型   |
| ---------------- | -------- | ------ |
| `Country`        | 国家名称 | string |
| `CountryCode`    | 国家简称 | string |
| `NewConfirmed`   | 新增确诊 | number |
| `TotalConfirmed` | 累计确诊 | number |
| `NewDeaths`      | 新增死亡 | number |
| `TotalDeaths`    | 累计死亡 | number |

2. 当用户改变 `select` 筛选器的选择时，根据用户的选择改变页面中展示的国家名以及确诊和死亡人数数据。如果用户没有选择任何国家，则展示默认值 0 和默认标题**“请选择国家”**。以选择法国为例：
   ![选择某个国家的效果](https://doc.shiyanlou.com/courses/uid2370472-20230119-1674112981596)

3. 页面底部的 `ECharts` 图表希望显示各个国家的累计确诊人数，请修改 `initChart` 函数的内容，使得图表 x 轴数据为**国家简称**，y 轴数据为**累计确诊人数**，效果如下：
   ![各个国家的累计确诊人数效果](https://doc.shiyanlou.com/courses/uid2370472-20230201-1675223364346)

最终效果可参考文件夹下面的 gif 图，图片名称为 effect.gif（提示：可以通过 VS Code 或者浏览器预览 gif 图片）。

## 规定

- 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径、class 名、id 名、图片名等，以免造成无法判题通过。

## 判分标准

- 完成目标 1，得 5 分。
- 完成目标 2，得 10 分。
- 完成目标 3，得 5 分。
