class Loading {
  constructor() {
    this.render()
  }

  render() {
    this.loading = document.createElement('i')
    this.loading.classList.add('lazy-loading')
    this.loading.classList.add('iconfont')
    this.loading.classList.add('icon-loading')
    document.body.appendChild(this.loading)
  }

  remove() {
    this.loading.remove()
  }
}

export default Loading
