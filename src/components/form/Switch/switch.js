import FormComponent from "../form-component";

class Switch extends FormComponent {
  constructor(element) {
    super(element)
    this.render()
  }

  render() {
    this.parentNode.insertAdjacentHTML('beforeend', `
      <div class="lazy-switch">
        <input class="hidden-top-layer-input" name="${ this.name }" type="checkbox" />
        <span></span>
      </div>
    `)
    this.remove()
  }
}

export default Switch
