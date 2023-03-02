---
layout: docs
title: Upload 文件上传
description: 通过点击或者拖拽上传文件
group: form
aliases:
  - "/docs/form/upload"
toc: true
---

## 照片墙

上传多张图片，可对图片格式和数量进行限制。

{{< example >}}
  <div class="lazy-upload"></div>

  <template>
    new LazyUI.Upload('.lazy-upload', {
      action: 'https://back-end/api/upload',
      limit: 3
    })
  </template>
{{< /example >}}


