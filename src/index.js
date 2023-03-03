const ctx = require.context('./', true, /.js$/)

const LazyUI = {}

ctx.keys().forEach(key => {
  const module = ctx(key)
  const componentName = module.default?.name
  if (componentName) {
    LazyUI[componentName] = module.default
  }
})

// CommonJS module
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports.default = LazyUI;
  }
}

// If there is a window object, that at least has a document property,
// instantiate and define chance on the window
if (typeof window === "object" && typeof window.document === "object") {
  window.LazyUI = LazyUI;
}
