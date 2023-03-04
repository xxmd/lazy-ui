/**
 * 从select，checkboxGroup或radioGroup中提取options
 * @param element 元素
 * @returns {{name, options: {label, value: *}[]}}
 */
export function extraOptions(element) {
  let inputEls
  if (element.tagName.toLowerCase() === 'select') {
    inputEls = element.querySelectorAll('option')
  } else {
    inputEls = element.querySelectorAll('input')
  }
  const options = Array.from(inputEls).map(item => {
    return {
      label: item.dataset.label || item.innerText,
      value: item.value
    }
  })
  return options
}

/**
 * 收集表单数据
 * @param form 表单元素
 * @returns {{}} 表单数据
 */
export function collectFormData(form) {
  const formDate = new FormData(form)
  const dataObj = {}
  formDate.forEach((value, key) => {
    const _value = dataObj[key]
    // 如果已存在
    if (_value) {
      dataObj[key] = formDate.getAll(key)
    } else {
      dataObj[key] = value
    }
  })
  return dataObj
}

/**
 * 判断元素是父元素的第几个孩子
 * @param element 子元素
 * @returns {number} 索引
 */
export function getIndex(element) {
  let index = 0;
  while (element.previousElementSibling) {
    index++
    element = element.previousElementSibling
  }
  return index
}

// flip动画（https://segmentfault.com/a/1190000040157713）
export function flip(srcIds, changedIds, invertFn) {
  const firstRect = geneIdRectMap(srcIds)
  invertFn()
  const lastRect = geneIdRectMap(changedIds)
  invert(srcIds, firstRect, lastRect)
}

// 计算偏移然后执行动画
function invert(ids, firstRect, lastRect) {
  ids.forEach(id => {
    const first = firstRect[id]
    const last = lastRect[id]
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;

    document.getElementById(id).style = `transform: translate(${deltaX}px, ${deltaY}px)`

    window.requestAnimationFrame(function () {
      // Play 去掉translate, 加上动画
      document.getElementById(id).style = 'transition: all 1s'
      document.getElementById(id).style.transform = ''
    })
  })
}

function geneIdRectMap(idList) {
  const result = {}
  idList.map(id => {
    result[id] = document.getElementById(id).getBoundingClientRect()
  })
  return result
}

/**
 * 根据html字符串生成元素
 * @param htmlStr html字符串
 * @param needOuter 是否需要外壳元素
 * @returns {Element}
 */
export function createElementByHtmlStr(htmlStr, needOuter = false) {
  const outer = document.createElement('div')
  outer.insertAdjacentHTML('afterbegin', htmlStr)
  if (needOuter) {
    return outer;
  } else {
    return outer.firstElementChild
  }
}

/**
 * 获取对象深度嵌套属性 如obj['job.jobName']
 * @param obj 对象
 * @param field 属性
 */
export function deepGet(obj, field) {
  if (obj && field) {
    const splitField = field.split('.')
    return  splitField.reduce((preValue, curValue) => {
      return preValue[curValue]
    }, obj)
  }
  return undefined
}

/**
 * 深度克隆
 * @param obj 需要克隆的对象
 */
export function deepClone(obj) {
  if (typeof obj !== 'object') {
    return
  }
  const tempObj = Array.isArray(obj) ? [] : {}
  // 普通属性处理
  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      tempObj[key] = deepClone(obj[key])
    } else {
      tempObj[key] = obj[key]
    }
  }

  // symbol属性处理
  for (let symbolKey of Object.getOwnPropertySymbols(obj)) {
    if (typeof obj[symbolKey] === 'object') {
      tempObj[symbolKey] = deepClone(obj[symbolKey])
    } else {
      tempObj[symbolKey] = obj[symbolKey]
    }
  }

  return tempObj;
}

/**
 * 数组根据某个字段进行排序
 * @param srcArr 原数组
 * @param field 字段
 * @param order 顺序['asc'|'desc']
 * @param modifySrcArr 顺序['asc'|'desc']
 * @returns {*}
 */
export function orderBy(srcArr, field, order) {
  const arr = deepClone(srcArr)
  arr.sort((a, b) => {
    return deepGet(a, field) - deepGet(b, field)
  })
  if (order === 'asc') {
    return arr
  } else {
    return arr.reverse()
  }
}
