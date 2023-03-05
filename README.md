## LazyUI

仿造 [Bootstrap](https://v4.bootcss.com/) 实现的一个简单UI组件库

## 在线预览

组件文档使用 [Hugo](https://gohugo.io/) 生成，目前已托管至 [GitHub Pages](https://xxmd.github.io/lazy-ui/)

## webpack中使用LazyUI

* npm 下载
```shell
npm install lazy-ui-webpack
```

* 在 index.js 入口文件中引入CSS
```javascript
import 'lazy-ui-webpack/dist/css/lazy-ui.min.css';
```
  
* 页面中使用
```javascript
import { Form } from "lazy-ui-webpack";

// 初始化表单
const element = ".form-container"
const options = {} // 表单配置
const form = new Form(element, options)

// 处理表单提交
form.onSubmit().then(res => {
  console.log("formData: " + res)
}).catch(error => {
  console.log("form validate fail: " + error)
})
```

## html 引入资源
```html
<!-- 引入CSS -->
<head>
  <link rel="stylesheet" href="https://unpkg.com/lazy-ui-webpack/dist/css/lazy-ui.min.css">
</head>
<!-- 引入JS -->
<script src="https://unpkg.com/lazy-ui-webpack/dist/js/lazy-ui.min.js"></script>
<script>
  console.log(window.LazyUI)
  // 初始化表单
  const form = new LazyUI.Form('.form-container', {})
  // 处理表单提交
  form.onSubmit().then(res => {
    console.log("formData: " + res)
  }).catch(error => {
    console.log("form validate fail: " + error)
  })
</script>
```

## 目录说明

```text
lazy-ui/
├── dist
├── site/           // Hugo相关
│    ├── assets/    // 可批量引入的资源
│    ├── content/   // 组件文档
│    ├── data/      // 页面数据
│    ├── layouts/   // 网站布局
│    └── static/    // 静态资源，可通过url引入
└── src/
    └── components/
        ├── basic/  // 基础组件
        ├── data/   // 数据展示相关组件
        ├── form/   // 表单相关组件
        └── others/ // 其他辅助组件
```

## Status

[![npm version](https://img.shields.io/npm/v/lazy-ui-webpack?logo=npm&logoColor=fff)](https://www.npmjs.com/package/lazy-ui-webpack)

