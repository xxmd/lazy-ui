---
layout: docs
title: Dialog 对话框
description: 在保留当前页面状态的情况下，告知用户并承载相关操作。
group: others
aliases:
  - "/docs/others/dialog"
toc: true
---

## 基本用法

使用 `LazyUI.Dialog()` 弹出一个对话框

{{< example >}}
  <button class="lazy-button lazy-button-primary" onclick="openDialog()">打开对话框</button>

  <template>
    const openDialog = function() {
        new LazyUI.Dialog({
            dialogBody: `<span>这是一段消息</span>`
        })
    }
  </template>
{{< /example >}}


