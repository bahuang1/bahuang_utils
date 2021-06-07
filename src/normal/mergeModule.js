
// 模块的整合
export function mergeModule(obj) {
  const modules = {}
  Object.keys(obj).forEach(key => {
    modules[key] = obj[key]
  })
  return modules
}
