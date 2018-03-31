import Watcher from './watcher'
import observer from './observer'
import Compiler from './compiler1'

class MVVM {
  constructor (options) {
    this.$options = options
    this._data = options.data
    // 将 vm 的数据关联到 vm._data 上
    Object.keys(options.data).forEach(key => {
      this._proxy(key)
    })

    // 开始监听所有的数据
    observer(this._data)

    // 编译节点，添加 watcher
    this.$compiler = new Compiler(options.el || document.body, this)  // body 是备选
  }

  $watch (expresstion, callback) {
    new Watcher(this, expresstion, callback)
  }

  _proxy (key) {
    Object.defineProperty(this, key, {
      configurable: false,  // 不可修改了
      enumerable: true,
      get () {
        return this._data[ key ]
      },
      set (newValue) {
        this._data[ key ] = newValue
      }
    })

  }
}

window.MVVM = MVVM