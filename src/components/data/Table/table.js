import BaseComponent from "@/components/base-component";
import { deepGet, orderBy, flip } from "../../../js/util";
import Paging from "../../others/Paging/paging";
import { getTableData } from "@/js/mock";
const tableTpl = require('./table.art')
const tbodyTpl = require('./tbody.art')

class Table extends BaseComponent{
  constructor(element, options) {
    super(element, options)
    // 请求数据渲染table
    this.init().then(() => {
      this.render()
      this.bindEvent()
    })
  }

  render() {
    this.insert(tableTpl(this))
    this.table = this.element
    this.thead = this.table.querySelector('thead')
    this.checkAllInput = this.thead.querySelector('input[type=checkbox]')
    this.tbody = this.table.querySelector('tbody')
    this.tableOperator = this.table.querySelector('.table-operator')
    this.batchDeleteBtn = this.tableOperator.querySelector('.batch-delete-btn')
    this.renderPaging()
  }

  // 渲染分页组件
  renderPaging() {
    new Paging('.table-paging', {
      total: this.total,
      onChange: this.onPagingChange.bind(this)
    })
  }

  onPagingChange(curPage, pageSize) {
    this.resetThead()
    this.init().then(() => {
      this.tbody.innerHTML = tbodyTpl(this)
    })
  }

  /**
   * 分页回调
   * @param curPage 当前页码
   * @param pageSize 每页数据量
   */
  async pagingCb(curPage, pageSize) {
    await this.init()
    this.switchActive(null)
    this.reRenderTbody(this.rows)
  }

  resetThead() {
    this.checkAllInput.checked = false
    this.activeArrow?.classList.remove('active-arrow')
  }

  init() {
    this.deepGet = deepGet
    this.fieldOrder = {}
    // 这里用symbol是为了避免后端传来的数据中对象有一个checked属性
    this.checkedSymbol = Symbol('checked')
    return new Promise( async (resolve) => {
      // 发送请求获取表格数据
      const res = await getTableData()
      this.rows = res.data
      this.preRowOrder = this.rows
      this.total = res.total
      resolve()
    })
  }

  /**
   * 表格数据发生变化重新渲染Tbody
   */
  reRenderTbody() {
    const srcId = this.preRowOrder.map(item => item.id)
    const changedIds = this.nextRowOrder.map(item => item.id)
    flip(srcId, changedIds, () => {
      this.tbody.innerHTML = tbodyTpl({
        deepGet: deepGet,
        rows: this.nextRowOrder,
        options: this.options
      })
    })
    this.preRowOrder = this.nextRowOrder
  }

  /**
   * 处理表头点击排序事件
   */
  bindSortEvent() {
    const sortableThs = this.thead.querySelectorAll(".sortable-th")
    sortableThs.forEach(item => {
      item.onclick = ({ target, currentTarget }) => {
        const upArrow = currentTarget.querySelector('.icon-solid-arrow-up')
        const downArrow = currentTarget.querySelector('.icon-solid-arrow-down')
        const field = currentTarget.dataset.field
        // 如果被点击的是上升或下降箭头
        if (target === upArrow || target === downArrow) {
          const order = target === upArrow ? 'asc' : 'desc'
          this.handleSort(currentTarget, field, order)
          return
        }
        // 点击的不是箭头，而是th内部区域，就要判断下一个排序顺序是什么
        // nextOrder有三种值 asc，desc和undefined
        const nextOrder = this.getNextOrder(this.fieldOrder[field])
        this.handleSort(currentTarget, field, nextOrder)
      }
    })
  }

  onBatchDelete() {
    this.batchDeleteBtn.onclick = ({ target }) => {
      if (!target.classList.contains('lazy-button-disabled')) {
        const checkedList = this.rows.filter(item => item[this.checkedSymbol])
        alert(JSON.stringify(checkedList))
      }
    }
  }

  bindCheckEvent() {
    // 这个点击事件不能绑定到所有checkBox上，因为tbody中的checkBox会因为重新渲染导致绑定事件失效
    this.table.onclick = ({ target }) => {
      if (target.tagName.toLowerCase() === 'input' && target.getAttribute('type') === 'checkbox') {
        this.onCheck(target)
      }
    }
  }

  onCheck(checkBox) {
    const checked = checkBox.checked
    const checkBoxes = this.tbody.querySelectorAll('input[type=checkbox]')
    const checkedSymbol = this.checkedSymbol
    // 点击了全选按钮
    if (checkBox.classList.contains('check-all-input')) {
      if (checked) {
        this.rows.map(item => {
          item[checkedSymbol] = true
        })
      } else {
        this.rows.map(item => {
          item[checkedSymbol] = false
        })
      }
      checkBoxes.forEach(item => {
        item.checked = checked
      })
    } else {
      this.rows[checkBox.dataset.index][checkedSymbol] = checked
      this.checkAllInput.checked = this.rows.every(item => item[checkedSymbol])
    }
    const selectedList = this.rows.filter(item => item[checkedSymbol])
    if (selectedList.length > 0) {
      this.batchDeleteBtn.classList.remove('lazy-button-disabled')
    } else {
      this.batchDeleteBtn.classList.add('lazy-button-disabled')
    }
    // 选中项发生变化的回调函数
    this.executeCallback('selectedListChange', selectedList)
  }

  bindEvent() {
    this.bindSortEvent()
    this.bindCheckEvent()
    this.onBatchDelete()
  }

  /**
   * 处理表格排序
   * @param currentTarget
   * @param field 排序字段
   * @param order 顺序
   */
  handleSort(currentTarget, field, order) {
    const upArrow = currentTarget.querySelector('.icon-solid-arrow-up')
    const downArrow = currentTarget.querySelector('.icon-solid-arrow-down')
    switch (order) {
      case 'asc':
        this.switchActive(upArrow)
        break
      case 'desc':
        this.switchActive(downArrow)
        break
      default:
        this.switchActive(null)
    }
    this.sort(field, order)
  }

  /**
   * 切换激活的箭头
   * @param target
   */
  switchActive(target) {
    if (this.activeArrow) {
      this.activeArrow.classList.remove('active-arrow')
    }
    if (target) {
      this.activeArrow = target
      this.activeArrow.classList.add('active-arrow')
    }
  }

  /**
   * 根据当前排序状态获取下一排序状态
   * @param curOrder 当前排序状态
   * @returns {string|undefined} 下一排序状态
   */
  getNextOrder(curOrder) {
    switch (curOrder) {
      case undefined:
        return 'asc'
      case 'asc':
        return 'desc'
      case 'desc':
        return undefined
    }
  }

  /**
   * 表格数据排序
   * @param field 排序字段
   * @param order 顺序
   */
  sort(field, order) {
    this.fieldOrder[field] = order
    // 当order为undefined时无需排序
    this.nextRowOrder = order ? orderBy(this.rows, field, order, false) : this.rows
    this.reRenderTbody()
  }
}

export default Table



