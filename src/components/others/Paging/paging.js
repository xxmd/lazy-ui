import BaseComponent from "../../base-component";
import pagingTpl from './paging.art'
import indicatorTpl from './indicator.art'
import Select from "../../form/Select/select";

const pageSizeOptions = [
  {
    label: '10条/页',
    value: 10,
  },
  {
    label: '20条/页',
    value: 20,
  },
  {
    label: '30条/页',
    value: 30,
  },
]

class Paging extends BaseComponent {
  constructor(element, options) {
    super(element, options);
    this.init()
    this.render()
    this.bindEvent()
  }

  init() {
    this.curPage = this.options.curPage || 1
    this.pageSize = this.options.pageSize || 10
    this.total = this.options.total || 10
    this.pageCount = Math.ceil(this.total / this.pageSize)
    this.geneIndicatorNums()
  }

  /**
   * 处理指示器点击
   */
  onIndicatorClick() {
    this.indicator.onclick = ({ target }) => {
      let newCurPage
      if (target.tagName.toLowerCase() === 'i' && !target.classList.contains('indicator-item-disabled')) {
        newCurPage = target.classList.contains('icon-arrow-left') ? this.curPage - 1 : this.curPage + 1
      } else {
        newCurPage = Number(target.innerText)
      }
      if (newCurPage && !Number.isNaN(newCurPage)) {
        this.changeCurPage(newCurPage)
      }
    }
  }

  /**
   * 处理input输入确认分页跳转
   */
  onInputConfirm() {
    const jumpBtn = this.element.querySelector('.jump-btn')
    jumpBtn.onclick = () => {
      let newCurPage = Number(this.jumpInput.value)
      if (Number.isNaN(newCurPage) || newCurPage < 0 || newCurPage > this.pageCount) {
        newCurPage = 1;
      }
      this.changeCurPage(newCurPage)
    }
  }

  bindEvent() {
    this.onIndicatorClick()
    this.onInputConfirm()
  }

  render() {
    this.insert(pagingTpl(this))
    this.indicator = this.element.querySelector('.paging-indicator')
    this.jumpInput = this.element.querySelector('.jump-input')
    new Select('.select-box', {
      name: 'pageSize',
      options: pageSizeOptions,
      onChange: this.onPageSizeChange.bind(this),
      selectedValue: 10
    })
  }

  /**
   * 根据curPage和pageCount算出指示器数字有哪些
   */
  geneIndicatorNums() {
    const ellipsis = '...'
    const indicatorNums = []
    indicatorNums[0] = 1
    if (this.pageCount <= 7) {
      for (let i = 1; i < this.pageCount; i++) {
        indicatorNums[i] = i + 1;
      }
    } else if (this.curPage <= 2) {
      indicatorNums[1] = 2
      indicatorNums[2] = 3
      indicatorNums[3] = ellipsis
      indicatorNums[4] = this.pageCount
    } else if (this.pageCount - this.curPage <= 1) {
      indicatorNums[1] = ellipsis
      indicatorNums[2] = this.pageCount - 2
      indicatorNums[3] = this.pageCount - 1
      indicatorNums[4] = this.pageCount
    } else if (this.curPage === 3) {
      indicatorNums[1] = 2
      indicatorNums[2] = 3
      indicatorNums[3] = 4
      indicatorNums[4] = ellipsis
      indicatorNums[5] = this.pageCount
    } else if (this.pageCount - this.curPage === 2) {
      indicatorNums[1] = ellipsis
      indicatorNums[2] = this.pageCount - 3
      indicatorNums[3] = this.pageCount - 2
      indicatorNums[4] = this.pageCount - 1
      indicatorNums[5] = this.pageCount
    } else {
      indicatorNums[1] = ellipsis
      indicatorNums[2] = this.curPage - 1
      indicatorNums[3] = this.curPage
      indicatorNums[4] = this.curPage + 1
      indicatorNums[5] = ellipsis
      indicatorNums[6] = this.pageCount
    }
    this.indicatorNums = indicatorNums
  }

  /**
   * 处理页码改变
   * @param newCurPage 新的页码
   */
  changeCurPage(newCurPage) {
    this.curPage = newCurPage
    this.geneIndicatorNums()
    this.indicator.innerHTML = indicatorTpl(this)
    this.jumpInput.value = newCurPage
    this.onChange()
  }

  onChange() {
    this.executeCallback('onChange', this.curPage, this.pageSize)
  }

  /**
   * 处理pageSize改变
   * @param newPageSize 新的pageSize
   */
  onPageSizeChange(newPageSize) {
    // pageSize变了curPage也要发生变化
    // 比如之前是 20条/页，然后页码是 1
    // 当切换到 30条/页时，页码就得变成 2
    const newCurPage = Math.floor(this.pageSize * this.curPage / newPageSize)
    this.pageSize = Number(newPageSize)
    this.pageCount = Math.ceil(this.total / this.pageSize)
    this.curPage = newCurPage >= 1 ? newCurPage : 1
    this.changeCurPage(this.curPage)
    this.onChange()
  }
}

export default Paging
