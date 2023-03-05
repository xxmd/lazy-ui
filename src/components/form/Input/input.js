import FormComponent from "../form-component";

class Input extends FormComponent {
  constructor(element) {
    super(element, {
      errorClassName: 'lazy-block-input-required'
    })
    this.render()
    this.bindEvent()
  }

  onInput() {
    this.element.oninput = ({ target }) => {
      this.validate(target.value.trim())
    }
  }

  bindEvent() {
    this.onInput()
  }

  render() {
    this.element.classList.add('lazy-block-input')
  }
}

export default Input
