export function validateValue(value) {
  return new Promise((resolve, reject) => {
    if (!value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)) {
      reject()
    } else {
      resolve()
    }
  })
}
