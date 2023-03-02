import Switch from "../Switch/switch";
import Select from "../Select/select";
import Checkbox from "../Checkbox/checkbox";
import Radio from "../Radio/radio";
import BaseComponent from "../../base-component";
import { collectFormData } from "@/js/util";
import Input from "../Input/input";
import { extraOptions } from "../../../js/util";

class Form extends BaseComponent {
  constructor(element, options) {
    super(element, options)
    this.init()
    this.render()
    this.bindEvent()
  }

  init() {
    this.children = []
  }

  validateForm(formData) {
    const promises = this.children.map(child => {
      return child.validate(formData[child.name])
    })
    return Promise.all(promises);
  }

  onSubmit() {
    this.element.onsubmit = (event) => {
      event.preventDefault()
      const formData = collectFormData(this.element)
      this.validateForm(formData).then(() => {
        this.executeCallback('onSubmit', formData)
      }).catch(error => console.log(error))
    }
  }

  onReset() {
    this.element.onreset = () => {
      this.children.forEach(item => item.clearError())
    }
  }

  bindEvent() {
    this.onSubmit()
    this.onReset()
  }

  render() {
    const formItems = this.element.querySelectorAll('.form-item')
    formItems.forEach(formItem => {
      const lastChild = formItem.lastElementChild
      const tageName = lastChild.tagName.toLowerCase()
      switch (tageName) {
        case 'input': {
          this.renderInput(lastChild)
          break
        }
        case 'select': {
          this.renderSelect(lastChild)
          break
        }
        case 'div': {
          this.renderDiv(lastChild)
          break
        }
      }
    })
  }

  renderSelect(selectEl) {
    this.renderChild(Select, selectEl, { options: extraOptions(selectEl) })
  }

  renderChild(_constructor, ...args) {
    this.children.push(new _constructor(...args))
  }

  renderInput(inputEl) {
    const type = inputEl.dataset.type || inputEl.type
    switch (type) {
      case 'switch': {
        this.renderChild(Switch, inputEl)
        break
      }
      default:
        this.renderChild(Input, inputEl)
    }
  }

  renderDiv(divEl) {
    if (divEl.classList.contains('checkbox-group')) {
      this.renderChild(Checkbox, divEl)
    } else {
      this.renderChild(Radio, divEl)
    }
  }
}

export default Form
