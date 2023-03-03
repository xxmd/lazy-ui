## LazyUI

仿造Bootstrap实现的一个简单UI组件库

## 安装

- Clone the repo: `git clone https://github.com/xxmd/lazy-ui.git`
- Install with [npm](https://www.npmjs.com/): `npm install lazy-ui-webpack`

## 用法
```html
<!-- 引入JS -->
<script src="https://unpkg.com/lazy-ui-webpack/dist/js/lazy-ui.min.js"></script>
<script>
  console.log(window.LazyUI)
  new LazyUI.Form('.form-container')
</script>
```

##目录说明

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

