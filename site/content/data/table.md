---
layout: docs
title: Table 数据表格
description: 用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。
group: data
aliases:
  - "/docs/data/table"
toc: true
---

## 基础表格

点击字段排序有惊喜

{{< example >}}
  <div class="lazy-table"></div>

  <template>
    new LazyUI.Table('.lazy-table', {
      url: '/getTableData',
      cols: [
        {
            field: 'name',
            title: '姓名'
        },
        {
            field: 'age',
            title: '年龄',
            sort: true,
            width: 80
        },
        {
            field: 'sex',
            title: '性别',
            formatter: ({ val }) => val === 'male' ? '男' : '女'    
        },
        {
            field: 'email',
            title: '邮箱'   
        },
        {
            field: 'job.jobName',
            title: '职位名称'
        },
        {
            field: 'job.expectedSalary',
            title: '期望薪资(元)',
            align: 'right',
            sort: true
        },
        {
            title: '操作',
            formatter: () => `<div class="operate-btns">
                                <span class="row-edit">编辑</span>
                                <span class="row-delete" onclick="alert('确认删除吗?')">删除</span>
                              </div>`
        }
      ]
    })
  </template>
{{< /example >}}


