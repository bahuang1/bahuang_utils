import xss from 'xss'
export function getSafeText(input) {
  if (!input) {
    return ''
  }
  const ele = document.createElement('div')
  ele.innerHTML = xss(input)
  return ele.innerText
}
