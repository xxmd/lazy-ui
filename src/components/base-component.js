class BaseComponent {
  /**
   * 基础组件构造器函数
   * @param element
   * @param options 组件配置
   */
  constructor(element, options) {
    if (typeof element === 'object') {
      this.element = element
    } else {
      this.element = document.querySelector(element)
    }
    this.options = options
    this.parentNode = this.element.parentNode
  }

  remove() {
    this.element.remove()
  }

  insert(htmlSnippet, removeOuter = true) {
    this.parentNode.insertAdjacentHTML('beforeend', htmlSnippet)
    if (removeOuter) {
      this.remove()
      this.element = this.parentNode.lastElementChild
    }
  }

  /**
   * 执行回调
   * @param cbName
   * @param args
   */
  executeCallback(cbName, ...args) {
    const cbFn = this.options[cbName]
    if (cbFn && typeof cbFn === 'function') {
      cbFn(...args)
    }
  }
}

export default BaseComponent
