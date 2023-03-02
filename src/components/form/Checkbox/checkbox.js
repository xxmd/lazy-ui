import FormComponent from "../form-component";
import { extraOptions } from "@/js/util";
import checkboxTpl from './checkbox.art'

class Checkbox extends FormComponent {
  constructor(element) {
    super(element)
    this.init()
    this.render()
    this.bindEvent()
  }

  bindEvent() {
    this.element.onclick = () => {
      const inputEls = this.element.querySelectorAll('input')
      const checkedArr = Array.from(inputEls).filter(item => item.checked)
      this.validate(checkedArr)
    }
  }

  init() {
    this.options = extraOptions(this.element)
  }

  render() {
    this.parentNode.style.alignItems = 'normal'
    this.insert(checkboxTpl(this))
  }
}

export default Checkbox
