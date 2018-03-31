// 定义对象，可写默认属性值，可设置属性描述，value 可以是个方法，比如数组方法
export function def (obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    configurable: true,
    enumerable: !!enumerable
  })

}

// 去抖动函数，immediate 表示是时间区间开始调用，还是之后
export function debounce (func, wait, immediate) {
  let timeout = null

  return function () {
    let delay = function () {
      if (!immediate) { // 不是立即触发才调用
        func.apply(this, arguments)
      }
    }

    let callnow = immediate && !timeout // 不存在 timeout（第一次），并且立即触发
    clearTimeout(timeout)
    timeout = setTimeout(delay, wait)

    callnow && func.apply(this, arguments)
  }

}
