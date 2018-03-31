import Dep from './dep'

export default class Watcher {
  /**
   * @param vm  Vue 实例
   * @param expression  data 的表达式，比如 a.b.c
   * @param callback  更新后的回调
   */
  constructor (vm, expression, callback) {
    this.vm = vm
    this.expression = expression
    this.callback = callback

    // 记录每个绑定该 watcher 的 dep
    this.depIds = {}

    // 初始化，并缓存对应的值
    this.oldValue = this.get()
  }

  addDep (dep) {  // 当前 data 的 dep
    if (!this.depIds.hasOwnProperty(dep.id)) {  // 防止重复绑定
      dep.addSub(this)
      this.depIds[ dep.id ] = dep
    }
  }

  get () {
    Dep.target = this // 当前 watcher 指向该 watcher
    let value = this.getVMVal() // 这里会触发 vm 上指定 data 的 get 方法，将该 watcher 绑定到 data 的 dep 上
    Dep.target = null

    return value
  }

  // 去 实例中里 data 取值
  getVMVal () {
    let expression = this.expression.split('.')
    let value = this.vm // 直接从实例上取，做了映射关系

    expression.forEach(curVal => value = value[ curVal ])
    return value
  }

  update () {
    let newValue = this.get() // 这里又触发了一次 target 设置？
    let oldValue = this.oldValue
    
    if (newValue !== this.oldValue) {
      this.oldValue = newValue
      this.callback.call(this.vm, newValue, oldValue)
    }
  }
}