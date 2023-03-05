---
layout: docs
title: Form 表单
description: 由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据
group: form
aliases:
  - "/docs/form/form"
toc: true
---

## 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

{{< example >}}
  <form style="width: fit-content" class="lazy-form">
    <div class="form-item">
      <label>活动名称</label>
      <input autocomplete="off" data-required="true" data-tips="请输入活动名称" name="name" type="text" placeholder="请输入活动名称">
    </div>
  
    <div class="form-item">
      <label>活动区域</label>
      <select name="city" data-required="true" data-tips="请选择活动区域">
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
        <option value="shenzhen">深圳</option>
      </select>
    </div>
  
    <div class="form-item">
      <label>即时配送</label>
      <input name="delivery" data-type="switch">
    </div>
  
    <div class="form-item">
      <label>活动性质</label>
      <div class="checkbox-group" data-name="nature" data-required="true" data-tips="请选择活动性质">
        <input value="online" data-label="美食/餐厅线上活动">
        <input value="local" data-label="地推活动">
        <input value="offline" data-label="线下主题活动">
      </div>
    </div>
  
    <div class="form-item">
      <label>特殊资源</label>
      <div class="radio-group" data-name="resource" data-required="true" data-tips="请选择特殊资源">
        <input value="brand" data-label="品牌商赞助">
        <input value="free" data-label="场地免费">
      </div>
    </div>
  
    <div class="form-item">
      <label>备注</label>
      <textarea name="remarks"></textarea>
    </div>
  
    <div class="btns">
      <button class="lazy-button lazy-button-primary" type="submit">确认</button>
      <button class="lazy-button" type="reset">重置</button>
    </div>
  </form>

  <template>
    new LazyUI.Form('.lazy-form', {
        onSubmit: formData => alert(JSON.stringify(formData))
    })
  </template>
{{< /example >}}
