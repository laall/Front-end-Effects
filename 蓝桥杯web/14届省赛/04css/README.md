# 自适应页面

## 介绍

响应式布局是在 2010 年 5 月份提出的一个概念，这个概念是为解决移动互联网浏览而诞生的。简而言之，就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。通过响应式布局可以为不同终端的用户提供更加舒适的界面和更好的用户体验，而且随着大屏幕移动设备的普及，用“大势所趋”来形容也不为过。因此越来越多的设计师采用这个技术。

本题需要在已提供的基础项目中，使用 CSS 或者 DOM 操作达到 Menu 和内容页自适应的效果。

## 准备

开始答题前，需要先打开本题的项目代码文件夹，目录结构如下：

```txt
├── css
│   └── style.css
├── images
│   ├── C++_course.png
│   ├── linux_course.png
│   └── python_course.png
├── index.html
├─── js
│    └── jQuery.min.js
├── default.gif
├── effect.gif
```

其中：

- `index.html` 是主页面。
- `css/style.css` 是需要补充样式的文件。
- `js/jQuery.min.js` 是 jQuery 库文件。
- `images` 是图片文件夹。
- `default.gif` 是 PC 端默认效果图。
- `effect.gif` 是移动端自适应效果图。

在浏览器中预览 `index.html` 页面，默认 PC 端页面显示如下所示：

![初始效果](https://doc.shiyanlou.com/courses/uid1693782-20230227-1677478339964)

## 目标

初始页面已经具备基础的布局和交互效果，包含 `hover` 高亮，展示二级菜单等。效果见文件夹下面的 gif 图，图片名称为 `default.gif`（提示：可以通过 VS Code 或者浏览器预览 gif 图片）。

请通过补全 `css/style.css` 中代码或操作 DOM 的方式，达到根据屏幕大小显示不同布局的效果。

- 以 `800px` 为界限，`800px` 以上显示 PC 端布局，否则显示移动端布局，**需要实现移动端布局样式**如下：

![移动端页面效果](https://doc.shiyanlou.com/courses/14311/1723100/ee451b99fa8a7ee0f209fe23d05739dd-0)

- 移动端 **Menu** 由左上侧按钮（即 class 包含 `icon-menu` 的 `label` 标签）控制显隐，按钮大小已经默认提供，无需手动设置大小。且 Menu 按钮展示时，需要浮动在内容卡片上方，不能被遮挡，移动端和 PC 端顶部导航栏高度一致，均为 `54px`。
- 移动端导航栏的菜单项每一项独占一行。
- 显示移动端布局时，卡片描述和对应图片各占一行，且都撑满 `#tutorials` 容器。

移动端页面展开菜单栏效果如下所示：

![移动端页面展开菜单栏效果](https://doc.shiyanlou.com/courses/14311/1604305/076cf231f1996598868a946328c12466-0)

最终效果可参考文件夹下面的 gif 图，图片名称为 effect.gif（提示：可以通过 VS Code 或者浏览器预览 gif 图片）。

> 考生可以根据需要使用 jQuery 实现脚本控制，也可以只使用纯 CSS 实现。

## 规定

- 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径、class 名、id 名、图片名等，以免造成无法判题通过。

## 判分标准

- 本题完全实现题目目标得满分，否则得 0 分。
