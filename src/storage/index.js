
// 本地缓存存储
export function localStorageSet(name, obj) {
  if (typeof obj === 'object') {
    localStorage.setItem(name, JSON.stringify(obj))
  } else {
    localStorage.setItem(name, obj)
  }
}

// 本地缓存获取
export function localStorageGet(name) {
  const obj = localStorage.getItem(name)
  if (obj && (obj.startsWith('[') || obj.startsWith('{'))) {
    return JSON.parse(obj)
  } else {
    return obj
  }
}

// 本地缓存删除
export function localStorageRemove(name) {
  localStorage.removeItem(name)
}

// 会话缓存 存储
export function sessionStorageSet(name, obj) {
  if (typeof obj === 'object') {
    sessionStorage.setItem(name, JSON.stringify(obj))
  } else {
    sessionStorage.setItem(name, obj)
  }
}

// 会话缓存 获取
export function sessionStorageGet(name) {
  const obj = sessionStorage.getItem(name)
  if (obj && (obj.startsWith('[') || obj.startsWith('{'))) {
    return JSON.parse(obj)
  } else {
    return obj
  }
}
