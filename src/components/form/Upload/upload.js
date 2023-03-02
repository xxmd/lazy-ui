import FormComponent from "../form-component";
import { getIndex } from "../../../js/util";
import Dialog from "../../others/Dialog/dialog";

class Upload extends FormComponent {
  constructor(element, options) {
    super(element, options)
    this.init()
    this.bindEvent()
  }

  checkLimit() {
    if (this.fileList.length >= Number(this.options.limit)) {
      alert('limit')
      return false
    }
    return true
  }

  /**
   * 新增文件dom结构
   * @param file
   */
  appendFileDom(file) {
    if (this.checkLimit()) {
      const url = URL.createObjectURL(file)
      file.url = url
      this.fileList.push(file)
      const fileDom = `<div class="file-item">
                          <img src="${ url }">
                          <label>
                            <i class="iconfont icon-check-mark"></i>
                          </label>
                          <div class="operate-btns">
                            <i class="iconfont icon-preview"></i>
                            <i class="iconfont icon-delete"></i>
                          </div>
                        </div>`
      this.uploadIndicator.insertAdjacentHTML('beforebegin', fileDom)
    }
  }

  init() {
    this.name = this.name || 'file'
    this.fileList = []
    const indicatorHtml = `<div class="file-item upload-indicator">
                              <input type="file" name="{{ name }}" class="hidden-top-layer-input" multiple accept="image/*" title="">
                              <i class="iconfont icon-add"></i>
                            </div>`
    this.element.insertAdjacentHTML('beforeend', indicatorHtml)
    this.uploadIndicator = this.element.querySelector('.upload-indicator')
    this.bindUpload()
  }

  // 绑定文件上传事件
  bindUpload() {
    const inputEl = this.uploadIndicator.querySelector('.hidden-top-layer-input')
    inputEl.onchange = ({ target }) => {
      for (let file of target.files) {
        this.appendFileDom(file)
      }
    }
  }

  // 删除图片
  onDelete(target) {
    const { currentTarget, index} = this.findIndex(target)
    currentTarget.remove()
    this.fileList.splice(index, 1)
  }

  findIndex(target) {
    while (!target.classList.contains('file-item')) {
      target = target.parentNode
    }
    return {
      currentTarget: target,
      index: getIndex(target)
    }
  }

  // 预览大图
  onPreview(target) {
    const { index } = this.findIndex(target)
    const file = this.fileList[index]
    new Dialog({
      dialogTitle: file.name,
      dialogBody: `
        <div style="text-align: center">
          <img src="${ file.url }"></img>
        </div>
      `
    })
  }

  bindBtnClick() {
    this.element.onclick = ({ target }) => {
      // 判断是预览还是删除
      if (target.classList.contains('icon-preview')) {
        this.onPreview(target)
        return
      }
      if (target.classList.contains('icon-delete')) {
        this.onDelete(target)
        return
      }
    }
  }

  bindEvent() {
    this.bindBtnClick()
  }
}


export default Upload
