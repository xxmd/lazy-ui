---
layout: docs
title: 安装
description: 快速引入LazyUI
group: start
aliases:
  - "/start/install"
  - "/start"
toc: true
---

## npm 安装

推荐使用 `npm` 的方式安装，它能更好地和 `webpack` 打包工具配合使用。

```shell
npm i lazy-ui-webpack -S
```

## CDN

目前可以通过 `unpkg` 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/lazy-ui/dist/css/lazy-ui.min.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/lazy-ui/dist/js/lazy-ui.min.js"></script>
```

## Hello world

通过 `CDN` 的方式我们可以很容易地使用 `LazyUI` 写出一个 `Hello world` 页面。在线演示

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- import CSS -->
  <link rel="stylesheet" href="https://unpkg.com/lazy-ui/dist/css/lazy-ui.min.css">
</head>
<body>
  <div class="lazy-row">
    <div class="lazy-col-4 lazy-col-offset-4">Hello World</div>
  </div>
</body>
  <!-- import JS -->
  <script src="https://unpkg.com/lazy-ui/dist/js/lazy-ui.min.js"></script>
</html>
```
