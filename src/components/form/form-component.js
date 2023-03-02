import BaseComponent from "../base-component";
import {validateValue} from "../../js/validate";

class FormComponent extends BaseComponent {
  constructor(element, options) {
    super(element, options);
    this.errorClassName = options?.errorClassName
    this.name = this.element.dataset.name || this.element.name || this.options.name
    this.isRequired = Boolean(this.element.dataset.required)
    if (this.isRequired) {
      this.element.previousElementSibling.classList.add('required-label')
      this.tips = this.element.dataset.tips
    }
  }

  validate(value) {
    if (this.isRequired) {
      return new Promise((resolve, reject) => {
        validateValue(value).then(() => {
          this.clearError()
          return resolve()
        }).catch(() => {
          this.markError()
          return reject()
        })
      })
    }
    return Promise.resolve()
  }

  markError() {
    this.errorClassName && this.element.classList.add(this.errorClassName)
    this.parentNode.insertAdjacentHTML('beforeend', `<span class="error-tips">${ this.tips }</span>`)
  }

  clearError() {
    this.errorClassName && this.element.classList.remove(this.errorClassName)
    this.parentNode.querySelector('.error-tips')?.remove()
  }
}

export default FormComponent
