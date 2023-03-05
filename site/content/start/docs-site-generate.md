---
layout: docs
title: 网站生成
description: 使用 Hugo 生成文档网站
group: start
aliases:
  - "/start/docs-site-generate"
toc: true
---

## Hugo

[Hugo](https://gohugo.io/) 是由Go语言实现的静态网站生成器。

## 网站生成步骤
* 使用 `hugo new site site-name` 命令生成一个网站，目录结构如下。

```text
site-name/
├── archetypes/
│   └── default.md
├── assets/
├── content/    // 网站页面
├── data/       // 页面数据
├── layouts/    // 网站布局
├── public/
├── static/     // 可通过url直接访问的静态资源
├── themes/     // 网站主题
└── config.toml // Hugo 配置文件
```

*  在 `layouts` 目录中定义网站布局 ( 例如 navbar，sidebar，content，footer 这种经典布局 ) 。

*  在 `content` 目录中新建网站页面，文件格式为 .md ( markdown文件 )。

* 使用 `hugo serve` 命令运行该网站。

