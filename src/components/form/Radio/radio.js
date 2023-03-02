import radioTpl from './radio.art'
import {extraOptions} from "@/js/util";
import FormComponent from "../form-component";

class Radio extends FormComponent {
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
    this.insert(radioTpl(this))
  }
}

export default Radio
