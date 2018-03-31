import {def} from './util'

// 简化原型
const arrayProto = Array.prototype

// 继承至数组，待会覆盖方法
export const arrayMethods = Object.create(arrayProto);

// 这里都是改变自身的方法
[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) { // 这里要注意不要用 => 函数，保存 this 指向

  const original = arrayProto[ method ]  // 缓存原始方法

  // 覆盖原始方法
  def(arrayMethods, method, function () {
    // 处理参数数组
    const args = [].slice.call(arguments)

    const result = original.apply(this, args) // this 为 data 数组
    // 插入副作用
    const ob = this.__ob__ // data 的 observer 对象，见 observer

    // 取出添加的新值
    let inserted
    switch (method) {
      case'push':
        inserted = args
        break
      case'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }

    // 监听新值，如果是对象就有效果
    inserted && ob.observerArray(inserted)

    // 每次触发数组对象的 dep 发布事件
    ob.dep.notify()

    return result
  })

})

/**
 数组方法调用的副作用
 ob.observerArray(newValue)
 ob.dep.notify()
 **/