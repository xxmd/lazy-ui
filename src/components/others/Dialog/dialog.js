import dialogTpl from './dialog.art'
import {createElementByHtmlStr} from "../../../js/util";

class Dialog {
  constructor(options) {
    this.options = options
    this.render()
    this.bindEvent()
  }

  bindEvent() {
    const dialogInner = this.dialog.querySelector('.lazy-dialog-inner')
    dialogInner.onclick = ({ target }) => {
      if (target.classList.contains('icon-close') || target.tagName.toLowerCase() === 'button') {
        this.remove()
      }
    }
  }

  render() {
    this.dialog = createElementByHtmlStr(dialogTpl(this))
    document.body.appendChild(this.dialog)
  }

  remove() {
    this.dialog.remove()
  }
}

export default Dialog
