---
layout: docs
title: Layout 布局
description: 通过基础的 12 分栏，便捷地创建布局。
group: basic
aliases:
  - "/docs/basic/layout"
toc: true
---

## 栅格布局原理

定义容器大小，平分 `12` 份。再调整内外边距，最后结合媒体查询，就制作出了强大的响应式网格系统。Bootstrap框架中的网格系统就是这样实现的。

### SCSS 实现
```scss
// 混入
@import "../../../scss/mixins";

.lazy-row {
  // 清除浮动
  @include clearfix();
  display: block;
}

// 栅格总列数，即将容器宽度平分为12份
$grid-cols: 12;

// 百分比计算函数
@function compute-percent($n) {
  @return $n / $grid-cols * 100%;
}

// 对应列数占据的宽度
@for $i from 1 through $grid-cols {
  .lazy-col-#{$i} {
    float: left;
    width: compute-percent($i);
  }
}

// 列偏移
@for $i from 1 through $grid-cols {
  .lazy-col-offset-#{$i} {
    margin-left: compute-percent($i);
  }
}

// 最大列间距20px
$max-col-space: 20;

// 列间距
@for $i from 1 through $max-col-space {
  .lazy-col-space-#{$i} {
    margin: 0 1px * $i / 2;
    lazy-col-* {
      padding: 0 1px * $i / 2;
    }
  }
}
```

### 栅格布局示例

{{< example class="bd-example-row" >}}
<div class="lazy-row">
  <div class="lazy-col-4">4/12</div>
  <div class="lazy-col-4">4/12</div>
  <div class="lazy-col-4">4/12</div>
</div>
{{< /example >}}

{{< example class="bd-example-row" >}}
<div class="lazy-row">
  <div class="lazy-col-4">
    <div class="inner">4/12</div>  
  </div>
  <div class="lazy-col-4 lazy-col-offset-4">
    <div class="inner">4/12</div>  
  </div>
</div>
{{< /example >}}

{{< example class="bd-example-row-space" >}}
<div class="lazy-row lazy-col-space-10">
  <div class="lazy-col-4">
    <div class="inner">4/12</div>  
  </div>
  <div class="lazy-col-4">
    <div class="inner">4/12</div>  
  </div>
  <div class="lazy-col-4">
    <div class="inner">4/12</div>  
  </div>
</div>
{{< /example >}}

