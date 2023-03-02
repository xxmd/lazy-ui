const ctx = require.context('./', true, /.js$/)

window.LazyUI = {}

ctx.keys().forEach(key => {
  const module = ctx(key)
  const componentName = module.default?.name
  if (componentName) {
    window.LazyUI[componentName] = module.default
  }
})
