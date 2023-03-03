import selectTpl  from './select.art'
import FormComponent from "../form-component";


class Select extends FormComponent {
  constructor(element, options) {
    options.errorClassName = 'lazy-select-required'
    super(element, options)
    this.init()
    this.render()
    this.bindEvent()
  }

  bindInputFocusChange() {
    this.resultInput.onfocus = () => {
      this.selectOptionsEl.style.display = 'block'
    }
    this.resultInput.onblur = () => {
      setTimeout(() => {
        this.selectOptionsEl.style.display = 'none'
      }, 100)
    }
  }

  setSelectValue(value) {
    this.resultInput.value = value
  }

  bindOptionClick() {
    this.selectOptionsEl.onclick = ({ target }) => {
      if (target.tagName.toLowerCase() === 'input') {
        this.setSelectValue(target.dataset.label)
        this.executeCallback('onChange', target.value)
        this.validate(target.value)
      }
    }
  }

  bindEvent() {
    this.bindInputFocusChange()
    this.bindOptionClick()
  }

  init() {
    this.placeholder = this.element.dataset.placeholder || '请选择'
    this.selectOptions = this.options.options
    if (this.options.selectedValue) {
      for (let item of this.selectOptions) {
        if (item.value == this.options.selectedValue) {
          this.selectedLabel = item.label
          break
        }
      }
    }
  }

  render() {
    this.insert(selectTpl(this))
    this.resultInput = this.element.querySelector('.select-result > input')
    this.selectOptionsEl = this.element.querySelector('.select-options')
  }
}

export default Select
