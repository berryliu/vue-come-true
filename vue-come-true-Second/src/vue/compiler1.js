import Watcher from './watcher'
import observer from './observer'

const tagRE = /\{\{\{(.*)\}\}\}|\{\{(.*)\}\}/g  // 文本/html 的差值符号
const htmlRE = /^\{\{\{(.*)\}\}\}$/  // html 的差值符号
const textRE = /\{\{(.*)\}\}/g  // text 的差值符号
const paramsRE = /\((.+)\)/g  // 事件方法的参数对象符号
const stringRE = /\'(.*)\'/g  // 事件方法的字符串参数符号

export default class Compiler {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    if (this.$el) { // 说明 compile 的时候才绑定解析节点
      // 将 原始节点 加入编译片段，在内存里编译节点
      this.$fragment = this.createFragment(this.$el)

      this.compileElement(this.$fragment)
      this.$el.appendChild(this.$fragment)
    }
  }

  createFragment (el) {
    let fragment = document.createDocumentFragment()  // 创建虚拟节点片段
    let child

    while (child = el.firstChild) {  // 添加子片段
      fragment.appendChild(child)
    }
    return fragment
  }

  compileElement (el) { // 逐个编译节点片段
    let childNodes = el.childNodes;

    [].slice.call(childNodes).forEach(node => {
      let text = node.textContent

      if (this.isElementNode(node)) { // 元素节点编译
        this.compileNodeAttr(node)
      } else if (this.isTextNode(node) && textRE.test(text)) {  // 文本节点编译
        this.compileText(node)
      }

    })
  }

  compileNodeAttr (node) {  // 编译节点属性
    let nodeAttrs = node.attributes
    let lazyCompiler, lazyExp

    [].slice.call(nodeAttrs).forEach(attr => {
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        let expression = attr.value
        let directive = attrName.substring(2) // 取出 v- 后面的字符串

        if (directive === 'for') {  // for 循环 稍后处理
          lazyCompiler = directive
          lazyExp = expression

        } else if (this.isEventDirective(directive)) {  // 事件处理
          directiveUtil.addEvent(node, this.$vm, expression, directive)

        } else {  // 其他的指令
          directiveUtil[ directive ] && directiveUtil[ directive ](node, this.$vm, expression)
        }

        // 移除 vue 的指令
        node.removeAttribute(attrName)
      }
    })

    if (lazyCompiler === 'for') { // for 循环里没有子节点要处理
      directiveUtil[ lazyCompiler ] && directiveUtil[ lazyCompiler ](node, this.$vm, lazyExp)
    } else if (node.childNodes && node.childNodes.length) { // 继续处理子节点
      this.compileElement(node)
    }

  }

  compileText (node) {  // 编译文本节点
    const tokens = this.parseText(node.wholeText)  // wholeText 取出所有相邻文本节点，忽略元素节点
    let fragment = document.createDocumentFragment()

    tokens.forEach(token => {
      let el

      if (token.tag) {
        if (token.html) { // 响应式 html 节点
          el = document.createDocumentFragment()

          // fragment 没有 parent，插入文档树时是把子孙节点插进去
          // {{{}}} 方式添加 html 时解析的是个 空节点，所以要记录 parentNode 以便解析插入，不像 v-html
          el.$parent = node.parentNode

          el.$oncetime = true // 初始化编译 html 时需要
          directiveUtil.html(el, this.$vm, token.value)

        } else { // 响应式的文本节点
          el = document.createTextNode(" ")
          directiveUtil.text(el, this.$vm, token.value)
        }

      } else {
        el = document.createTextNode(token.value)
      }
      el && fragment.appendChild(el)
    })
    node.parentNode.replaceChild(fragment, node);
  }

  parseText (text) {  // 解析文本，生成数据对象
    if (tagRE.test(text)) {
      const tokens = []
      let lastIndex = tagRE.lastIndex = 0 // RegExp.exec() 和 RegExp.test() 找到的 lastIndex 会作为静态变量记录下来，要有 g
      let match, index, html, value

      while (match = tagRE.exec(text)) {
        index = match.index

        if (index > lastIndex) {  // 提取出匹配前的文本
          tokens.push({
            value: text.slice(lastIndex, index)
          })
        }

        html = htmlRE.test(match[ 0 ])  // 测试下是 html 还是 text
        value = html ? match[ 1 ] : match[ 2 ]
        tokens.push({
          value,
          html,
          tag: true
        })
        lastIndex = index + match[ 0 ].length // 重置下个起始节点

      }
      if (lastIndex < text.length) {  // 提取剩余文本
        tokens.push({
          value: text.slice(lastIndex)
        })
      }
      return tokens
    }

  }

  // 是否是元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }

  // 是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }

  // 是否是 vue 指令
  isDirective (attr) {
    return attr.indexOf('v-') === 0
  }

  // 是否是 vue 事件
  isEventDirective (attr) {
    return attr.indexOf('on') === 0
  }

}

// 指令解析
const directiveUtil = {
  text (node, vm, expression) { // 解析文本指令
    this.bind(node, vm, expression, 'text')
  },

  html (node, vm, expression) { // 解析 html 指令
    this.bind(node, vm, expression, 'html')
  },

  class (node, vm, expression) { // 解析 html 指令
    this.bind(node, vm, expression, 'class')
  },

  for (node, vm, expression) { // 解析 for 指令
    let forExpression = expression.split('in'), // item in data.list
      itemName = forExpression[ 0 ].replace(/\s/g, ''), // 默认 'item'
      arrayName = forExpression[ 1 ].replace(/\s/g, '').split('.'),
      parentNode = node.parentNode,
      startNode = document.createTextNode(''),
      endNode = document.createTextNode(''),
      range = document.createRange() // 这个 range 只是用来删除文档的

    // 把 node 替换成头尾两个空节点，便于待会插入。node 此时只是个占位，需要全部替换掉
    parentNode.replaceChild(endNode, node)
    parentNode.insertBefore(startNode, endNode)

    let value = vm // 这里不能用 _getVMVal，因为用了 JSON.string
    arrayName.forEach(val => {
      value = value[ val ]
    })

    value.forEach((item, index) => {  // 创建节点
      let cloneNode = node.cloneNode(true)  // 深度克隆
      parentNode.insertBefore(cloneNode, endNode) // 插入节点

      // 继承 vm，附上 '$index' 和 'item' 两个参数
      let forVm = Object.create(vm)
      forVm.$index = index
      forVm[ itemName ] = item

      new Compiler(cloneNode, forVm)
    })

    new Watcher(vm, arrayName + '.length', (newValue, oldValue) => {  // data.list.length 新旧值没用？只用 value 的引用
      // 清掉 content
      range.setStart(startNode, 0)
      range.setEnd(endNode, 0)
      range.deleteContents()

      value.forEach((item, index) => {  // 这里还是用 value，引用
        let cloneNode = node.cloneNode(true)  // 深度克隆
        parentNode.insertBefore(cloneNode, endNode) // 插入节点

        // 继承 vm，附上 '$index' 和 'item' 两个参数
        let forVm = Object.create(vm)
        forVm.$index = index
        forVm[ itemName ] = item
        new Compiler(cloneNode, forVm)
      })

    })

  },

  model (node, vm, expression) {
    this.bind(node, vm, expression, 'model')  // 这里还是 data -> view

    let value = this._getVMVal(vm, expression)  // 拿到的都是引用，待会会设置

    let composing = false // 中文输入法的优化，composition 与 input 协作

    node.addEventListener('compositionstart', () => {
      composing = true
    }, false)

    node.addEventListener('compositionend', e => {
      composing = false
      let eValue = e.target.value
      if (value !== eValue) {
        this._setVMVal(vm, expression, eValue)
      }
    })

    node.addEventListener('input', e => {
      let eValue = e.target.value
      if (!composing && value !== eValue) {
        this._setVMVal(vm, expression, eValue)
      }
    })
  },

  bind (node, vm, expression, directive) {
    let updateFn = updater[ directive + 'Updater' ] // 指令更新函数

    let value = this._getVMVal(vm, expression)
    updateFn && updateFn(node, value) // 更新值

    // 这里绑定 watcher，只有 className 才需要 oldValue
    new Watcher(vm, expression, (newValue, oldValue) => {
      updateFn && updateFn(node, value, oldValue)
    })
  },

  addEvent (node, vm, expression, directive) {
    let eventType = directive.split(':') // v-on:click
    let fn = vm.$options.methods && vm.$options.methods[ expression ]  // 事件回调方法

    if (eventType[ 1 ] && typeof fn === 'function') { // 直接绑定方法的
      node.addEventListener(eventType[ 1 ], fn.bind(vm), false)
    } else { // 找不到方法名的可能是带参数的
      let match = paramsRE.exec(expression),
        fnName = expression.replace(match[ 0 ], ''), // 替换掉参数
        paramNames = match[ 1 ].split(','),
        params = []

      fn = vm.$options.methods[ fnName ]

      paramNames.forEach(name => {
        name = name.trim()
        let stringMatch = stringRE.exec(name) // 参数有可能是字符串，有可能是变量

        if (stringMatch) {
          params.push(stringMatch[ 1 ])
        } else {
          // params.push(vm[name]) // 直接取值了
          params.push(this._getVMVal(vm, name))
        }
      })

      node.addEventListener(eventType[ 1 ], e => fn.apply(vm, params), false)  //apply 参数是数组

    }

  },

  _getVMVal (vm, expression) {
    let value = vm

    expression = expression.trim()
    expression = expression.split('.')

    expression.forEach(key => {
      if (value.hasOwnProperty(key)) {
        value = value[ key ]
      } else {
        throw new Error("Can not find the property: " + key);
      }
    })

    if (typeof value === 'object') {
      return JSON.stringify(value)  // 对象的话这里给了 JSON 的字符串
    } else {
      return value
    }

  },

  _setVMVal (vm, expression, value) {
    expression = expression.trim()
    let data = vm._data // 为啥不直接给 vm 上设置，只设置 vm._data 不是不能更新嘛
    expression = expression.split('.')
    expression.forEach((key, index) => {
      if (index === expression.length - 1) {
        data[ key ] = value
      } else {
        data = data[ key ]
      }
    })

  }

}

const updater = {
  textUpdater (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value
  },

  htmlUpdater (node, value) {
    if (node.$parent) { // 这里是 {{{}}} 进来的解析，node 是个空节点
      let cacheDiv = document.createElement('div')  // 临时缓存节点，TODO: 为什么不用 fragment？试一下

      cacheDiv.innerHTML = value
      const childNodes = cacheDiv.childNodes
      const doms = []

      let len = childNodes.length
      let tempNode

      if (node.$oncetime) { // 这里是 第一次 初始化 html 的解析
        while (len--) { // 为了删除旧节点，记录 $doms
          tempNode = childNodes[ 0 ]
          node.appendChild(tempNode)  // tempNode 此时已经从 childNodes 中转移到 node（删除了）
          doms.push(tempNode)
        }

        node.$doms = doms
        node.$oncetime = false

      } else {  // update 的 html 更新解析
        let newFragment = document.createDocumentFragment()
        while (len--) {
          tempNode = childNodes[ 0 ]
          newFragment.appendChild(tempNode)
          doms.push(tempNode)
        }

        node.$parent.insertBefore(newFragment, node.$doms[ 0 ]) // 这里唯一引用了 $dom
        node.$doms.forEach(childNode => {
          node.$parent.removeChild(childNode)
        })

        // 保存下次删除旧节点
        node.$doms = doms
      }

    } else { // 这里是 v-html
      node.innerHTML = typeof value === 'undefined' ? '' : value
    }

  },

  classUpdater (node, value, oldValue) {  // className 修改，这里需要 oldValue
    let nodeNames = node.className
    if (oldValue) {
      nodeNames = nodeNames.replace(oldValue, '').replace(/\s$/, '')  // 删掉旧 value，清掉结尾空格
    }
    let space = nodeNames && value ? ' ' : ''
    node.className = nodeNames + space + value
  },

  modelUpdater (node, value) {  // 这里都是 form 表单元素
    node.value = typeof value === 'undefined' ? '' : value
  }
}
