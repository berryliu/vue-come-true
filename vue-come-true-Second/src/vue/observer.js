import Dep from './dep'
import {def} from './util'
// 覆盖后的方法
import {arrayMethods} from './array1'

// 监听数据
export default function observer (data) {
  if (!data || typeof data !== 'object') {
    return
  } else if (data.hasOwnProperty('__ob__') && data[ '__ob__' ] instanceof Observer) {  // 绑定过了
    return
  }

  return new Observer(data)
}

// 原型继承
function protoAugment (target, src) {
  target.__proto__ = src
}

function copyAugment (target, src, keys) {
  keys.forEach(key => def(target, src, src[ key ]))
}

class Observer {
  constructor (data) {
    this.dep = new Dep()    // 不知道为啥

    def(data, '__ob__', this)   // 给 data 一个该 observer 的引用

    this.data = data

    if (Array.isArray(data)) {  // 数组处理复杂的多
      const argment = data.__proto__ ? protoAugment : copyAugment

      // 覆盖数组方法更新数据
      argment(data, arrayMethods, Object.keys(arrayMethods))

      this.observerArray(data)  // 对数组元素遍历，可能是对象

    } else {
      this.walk(data)
    }
  }

  walk (data) {
    Object.keys(this.data).forEach(key => {
      this.defineReactive(data, key, data[ key ])
    })
  }

  observerArray (items) {
    items.forEach(item => observer(item))
  }

  defineReactive (data, key, value) {
    let dep = new Dep() // 给每个 data 值都设定一个 dep，用来管理自己的 watcher
    let descriptor = Object.getOwnPropertyDescriptor(data, key)

    if (descriptor && !descriptor.configurable) { // 有访问器，且访问器不能修改
      return
    }

    let childObserver = observer(value) // 子对象继续监听，不是对象会返回 undefined

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get () {
        if (Dep.target) { // 当前 watcher，在编译时添加 watcher 初始化时触发，见 watcher
          dep.depend()

          if (childObserver) {  // 子对象也需要添加父数据的 watcher，树状遍历更新？
            childObserver.dep.depend()
          }
        }
        return value
      },
      set (newValue) {
        if (newValue == value) {
          return
        }
        if (typeof newValue === 'object') {
          observer(newValue)
        }
        value = newValue

        // 通知更新
        dep.notify()
      }
    })

  }
}
