/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dep = __webpack_require__(2);

var _dep2 = _interopRequireDefault(_dep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Watcher = function () {
  /**
   * @param vm  Vue 实例
   * @param expression  data 的表达式，比如 a.b.c
   * @param callback  更新后的回调
   */
  function Watcher(vm, expression, callback) {
    _classCallCheck(this, Watcher);

    this.vm = vm;
    this.expression = expression;
    this.callback = callback;

    // 记录每个绑定该 watcher 的 dep
    this.depIds = {};

    // 初始化，并缓存对应的值
    this.oldValue = this.get();
  }

  _createClass(Watcher, [{
    key: 'addDep',
    value: function addDep(dep) {
      // 当前 data 的 dep
      if (!this.depIds.hasOwnProperty(dep.id)) {
        // 防止重复绑定
        dep.addSub(this);
        this.depIds[dep.id] = dep;
      }
    }
  }, {
    key: 'get',
    value: function get() {
      _dep2.default.target = this; // 当前 watcher 指向该 watcher
      var value = this.getVMVal(); // 这里会触发 vm 上指定 data 的 get 方法，将该 watcher 绑定到 data 的 dep 上
      _dep2.default.target = null;

      return value;
    }

    // 去 实例中里 data 取值

  }, {
    key: 'getVMVal',
    value: function getVMVal() {
      var expression = this.expression.split('.');
      var value = this.vm; // 直接从实例上取，做了映射关系

      expression.forEach(function (curVal) {
        return value = value[curVal];
      });
      return value;
    }
  }, {
    key: 'update',
    value: function update() {
      var newValue = this.get(); // 这里又触发了一次 target 设置？
      var oldValue = this.oldValue;

      if (newValue !== this.oldValue) {
        this.oldValue = newValue;
        this.callback.call(this.vm, newValue, oldValue);
      }
    }
  }]);

  return Watcher;
}();

exports.default = Watcher;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
// 覆盖后的方法


exports.default = observer;

var _dep = __webpack_require__(2);

var _dep2 = _interopRequireDefault(_dep);

var _util = __webpack_require__(3);

var _array = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 监听数据
function observer(data) {
  if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
    return;
  } else if (data.hasOwnProperty('__ob__') && data['__ob__'] instanceof Observer) {
    // 绑定过了
    return;
  }

  return new Observer(data);
}

// 原型继承
function protoAugment(target, src) {
  target.__proto__ = src;
}

function copyAugment(target, src, keys) {
  keys.forEach(function (key) {
    return (0, _util.def)(target, src, src[key]);
  });
}

var Observer = function () {
  function Observer(data) {
    _classCallCheck(this, Observer);

    this.dep = new _dep2.default(); // 不知道为啥

    (0, _util.def)(data, '__ob__', this); // 给 data 一个该 observer 的引用

    this.data = data;

    if (Array.isArray(data)) {
      // 数组处理复杂的多
      var argment = data.__proto__ ? protoAugment : copyAugment;

      // 覆盖数组方法更新数据
      argment(data, _array.arrayMethods, Object.keys(_array.arrayMethods));

      this.observerArray(data); // 对数组元素遍历，可能是对象
    } else {
      this.walk(data);
    }
  }

  _createClass(Observer, [{
    key: 'walk',
    value: function walk(data) {
      var _this = this;

      Object.keys(this.data).forEach(function (key) {
        _this.defineReactive(data, key, data[key]);
      });
    }
  }, {
    key: 'observerArray',
    value: function observerArray(items) {
      items.forEach(function (item) {
        return observer(item);
      });
    }
  }, {
    key: 'defineReactive',
    value: function defineReactive(data, key, value) {
      var dep = new _dep2.default(); // 给每个 data 值都设定一个 dep，用来管理自己的 watcher
      var descriptor = Object.getOwnPropertyDescriptor(data, key);

      if (descriptor && !descriptor.configurable) {
        // 有访问器，且访问器不能修改
        return;
      }

      var childObserver = observer(value); // 子对象继续监听，不是对象会返回 undefined

      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function get() {
          if (_dep2.default.target) {
            // 当前 watcher，在编译时添加 watcher 初始化时触发，见 watcher
            dep.depend();

            if (childObserver) {
              // 子对象也需要添加父数据的 watcher，树状遍历更新？
              childObserver.dep.depend();
            }
          }
          return value;
        },
        set: function set(newValue) {
          if (newValue == value) {
            return;
          }
          if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object') {
            observer(newValue);
          }
          value = newValue;

          // 通知更新
          dep.notify();
        }
      });
    }
  }]);

  return Observer;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _watcher = __webpack_require__(0);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

var Dep = function () {
  // 当前 watcher，全局的

  function Dep() {
    _classCallCheck(this, Dep);

    this.id = uid++; // 每一个 data 有一个通知者
    this.subs = [];
  }

  _createClass(Dep, [{
    key: 'addSub',
    value: function addSub(sub) {
      // 添加 watcher
      this.subs.push(sub);
    }
  }, {
    key: 'removeSub',
    value: function removeSub(sub) {
      // 删除 watcher
      var index = this.subs.indexOf(sub);
      index !== -1 && this.subs.splice(index, 1);
    }
  }, {
    key: 'notify',
    value: function notify() {
      // 通知所有 watch 更新
      this.subs.forEach(function (sub) {
        return sub.update();
      });
    }
  }, {
    key: 'depend',
    value: function depend() {
      // 将 当前 添加到该通知者（调用当前观察者的 addDep 方法，从而间接调用通知者的 addSub 方法添加观察者。。。为什么要这么绕？）
      Dep.target.addDep(this); // this 为当前 dep
    }
  }]);

  return Dep;
}();

exports.default = Dep;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.def = def;
exports.debounce = debounce;
// 定义对象，可写默认属性值，可设置属性描述，value 可以是个方法，比如数组方法
function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value: value,
    writable: true,
    configurable: true,
    enumerable: !!enumerable
  });
}

// 去抖动函数，immediate 表示是时间区间开始调用，还是之后
function debounce(func, wait, immediate) {
  var timeout = null;

  return function () {
    var delay = function delay() {
      if (!immediate) {
        // 不是立即触发才调用
        func.apply(this, arguments);
      }
    };

    var callnow = immediate && !timeout; // 不存在 timeout（第一次），并且立即触发
    clearTimeout(timeout);
    timeout = setTimeout(delay, wait);

    callnow && func.apply(this, arguments);
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _watcher = __webpack_require__(0);

var _watcher2 = _interopRequireDefault(_watcher);

var _observer = __webpack_require__(1);

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tagRE = /\{\{\{(.*)\}\}\}|\{\{(.*)\}\}/g; // 文本/html 的差值符号
var htmlRE = /^\{\{\{(.*)\}\}\}$/; // html 的差值符号
var textRE = /\{\{(.*)\}\}/g; // text 的差值符号
var paramsRE = /\((.+)\)/g; // 事件方法的参数对象符号
var stringRE = /\'(.*)\'/g; // 事件方法的字符串参数符号

var Compiler = function () {
  function Compiler(el, vm) {
    _classCallCheck(this, Compiler);

    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
      // 说明 compile 的时候才绑定解析节点
      // 将 原始节点 加入编译片段，在内存里编译节点
      this.$fragment = this.createFragment(this.$el);

      this.compileElement(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }
  }

  _createClass(Compiler, [{
    key: 'createFragment',
    value: function createFragment(el) {
      var fragment = document.createDocumentFragment(); // 创建虚拟节点片段
      var child = void 0;

      while (child = el.firstChild) {
        // 添加子片段
        fragment.appendChild(child);
      }
      return fragment;
    }
  }, {
    key: 'compileElement',
    value: function compileElement(el) {
      var _this = this;

      // 逐个编译节点片段
      var childNodes = el.childNodes;

      [].slice.call(childNodes).forEach(function (node) {
        var text = node.textContent;

        if (_this.isElementNode(node)) {
          // 元素节点编译
          _this.compileNodeAttr(node);
        } else if (_this.isTextNode(node) && textRE.test(text)) {
          // 文本节点编译
          _this.compileText(node);
        }
      });
    }
  }, {
    key: 'compileNodeAttr',
    value: function compileNodeAttr(node) {
      var _this2 = this;

      // 编译节点属性
      var nodeAttrs = node.attributes;
      var lazyCompiler = void 0,
          lazyExp = void 0;

      [].slice.call(nodeAttrs).forEach(function (attr) {
        var attrName = attr.name;
        if (_this2.isDirective(attrName)) {
          var expression = attr.value;
          var directive = attrName.substring(2); // 取出 v- 后面的字符串

          if (directive === 'for') {
            // for 循环 稍后处理
            lazyCompiler = directive;
            lazyExp = expression;
          } else if (_this2.isEventDirective(directive)) {
            // 事件处理
            directiveUtil.addEvent(node, _this2.$vm, expression, directive);
          } else {
            // 其他的指令
            directiveUtil[directive] && directiveUtil[directive](node, _this2.$vm, expression);
          }

          // 移除 vue 的指令
          node.removeAttribute(attrName);
        }
      });

      if (lazyCompiler === 'for') {
        // for 循环里没有子节点要处理
        directiveUtil[lazyCompiler] && directiveUtil[lazyCompiler](node, this.$vm, lazyExp);
      } else if (node.childNodes && node.childNodes.length) {
        // 继续处理子节点
        this.compileElement(node);
      }
    }
  }, {
    key: 'compileText',
    value: function compileText(node) {
      var _this3 = this;

      // 编译文本节点
      var tokens = this.parseText(node.wholeText); // wholeText 取出所有相邻文本节点，忽略元素节点
      var fragment = document.createDocumentFragment();

      tokens.forEach(function (token) {
        var el = void 0;

        if (token.tag) {
          if (token.html) {
            // 响应式 html 节点
            el = document.createDocumentFragment();

            // fragment 没有 parent，插入文档树时是把子孙节点插进去
            // {{{}}} 方式添加 html 时解析的是个 空节点，所以要记录 parentNode 以便解析插入，不像 v-html
            el.$parent = node.parentNode;

            el.$oncetime = true; // 初始化编译 html 时需要
            directiveUtil.html(el, _this3.$vm, token.value);
          } else {
            // 响应式的文本节点
            el = document.createTextNode(" ");
            directiveUtil.text(el, _this3.$vm, token.value);
          }
        } else {
          el = document.createTextNode(token.value);
        }
        el && fragment.appendChild(el);
      });
      node.parentNode.replaceChild(fragment, node);
    }
  }, {
    key: 'parseText',
    value: function parseText(text) {
      // 解析文本，生成数据对象
      if (tagRE.test(text)) {
        var tokens = [];
        var lastIndex = tagRE.lastIndex = 0; // RegExp.exec() 和 RegExp.test() 找到的 lastIndex 会作为静态变量记录下来，要有 g
        var match = void 0,
            index = void 0,
            html = void 0,
            value = void 0;

        while (match = tagRE.exec(text)) {
          index = match.index;

          if (index > lastIndex) {
            // 提取出匹配前的文本
            tokens.push({
              value: text.slice(lastIndex, index)
            });
          }

          html = htmlRE.test(match[0]); // 测试下是 html 还是 text
          value = html ? match[1] : match[2];
          tokens.push({
            value: value,
            html: html,
            tag: true
          });
          lastIndex = index + match[0].length; // 重置下个起始节点
        }
        if (lastIndex < text.length) {
          // 提取剩余文本
          tokens.push({
            value: text.slice(lastIndex)
          });
        }
        return tokens;
      }
    }

    // 是否是元素节点

  }, {
    key: 'isElementNode',
    value: function isElementNode(node) {
      return node.nodeType === 1;
    }

    // 是否是文本节点

  }, {
    key: 'isTextNode',
    value: function isTextNode(node) {
      return node.nodeType === 3;
    }

    // 是否是 vue 指令

  }, {
    key: 'isDirective',
    value: function isDirective(attr) {
      return attr.indexOf('v-') === 0;
    }

    // 是否是 vue 事件

  }, {
    key: 'isEventDirective',
    value: function isEventDirective(attr) {
      return attr.indexOf('on') === 0;
    }
  }]);

  return Compiler;
}();

// 指令解析


exports.default = Compiler;
var directiveUtil = {
  text: function text(node, vm, expression) {
    // 解析文本指令
    this.bind(node, vm, expression, 'text');
  },
  html: function html(node, vm, expression) {
    // 解析 html 指令
    this.bind(node, vm, expression, 'html');
  },
  class: function _class(node, vm, expression) {
    // 解析 html 指令
    this.bind(node, vm, expression, 'class');
  },
  for: function _for(node, vm, expression) {
    // 解析 for 指令
    var forExpression = expression.split('in'),
        // item in data.list
    itemName = forExpression[0].replace(/\s/g, ''),
        // 默认 'item'
    arrayName = forExpression[1].replace(/\s/g, '').split('.'),
        parentNode = node.parentNode,
        startNode = document.createTextNode(''),
        endNode = document.createTextNode(''),
        range = document.createRange(); // 这个 range 只是用来删除文档的

    // 把 node 替换成头尾两个空节点，便于待会插入。node 此时只是个占位，需要全部替换掉
    parentNode.replaceChild(endNode, node);
    parentNode.insertBefore(startNode, endNode);

    var value = vm; // 这里不能用 _getVMVal，因为用了 JSON.string
    arrayName.forEach(function (val) {
      value = value[val];
    });

    value.forEach(function (item, index) {
      // 创建节点
      var cloneNode = node.cloneNode(true); // 深度克隆
      parentNode.insertBefore(cloneNode, endNode); // 插入节点

      // 继承 vm，附上 '$index' 和 'item' 两个参数
      var forVm = Object.create(vm);
      forVm.$index = index;
      forVm[itemName] = item;

      new Compiler(cloneNode, forVm);
    });

    new _watcher2.default(vm, arrayName + '.length', function (newValue, oldValue) {
      // data.list.length 新旧值没用？只用 value 的引用
      // 清掉 content
      range.setStart(startNode, 0);
      range.setEnd(endNode, 0);
      range.deleteContents();

      value.forEach(function (item, index) {
        // 这里还是用 value，引用
        var cloneNode = node.cloneNode(true); // 深度克隆
        parentNode.insertBefore(cloneNode, endNode); // 插入节点

        // 继承 vm，附上 '$index' 和 'item' 两个参数
        var forVm = Object.create(vm);
        forVm.$index = index;
        forVm[itemName] = item;
        new Compiler(cloneNode, forVm);
      });
    });
  },
  model: function model(node, vm, expression) {
    var _this4 = this;

    this.bind(node, vm, expression, 'model'); // 这里还是 data -> view

    var value = this._getVMVal(vm, expression); // 拿到的都是引用，待会会设置

    var composing = false; // 中文输入法的优化，composition 与 input 协作

    node.addEventListener('compositionstart', function () {
      composing = true;
    }, false);

    node.addEventListener('compositionend', function (e) {
      composing = false;
      var eValue = e.target.value;
      if (value !== eValue) {
        _this4._setVMVal(vm, expression, eValue);
      }
    });

    node.addEventListener('input', function (e) {
      var eValue = e.target.value;
      if (!composing && value !== eValue) {
        _this4._setVMVal(vm, expression, eValue);
      }
    });
  },
  bind: function bind(node, vm, expression, directive) {
    var updateFn = updater[directive + 'Updater']; // 指令更新函数

    var value = this._getVMVal(vm, expression);
    updateFn && updateFn(node, value); // 更新值

    // 这里绑定 watcher，只有 className 才需要 oldValue
    new _watcher2.default(vm, expression, function (newValue, oldValue) {
      updateFn && updateFn(node, value, oldValue);
    });
  },
  addEvent: function addEvent(node, vm, expression, directive) {
    var _this5 = this;

    var eventType = directive.split(':'); // v-on:click
    var fn = vm.$options.methods && vm.$options.methods[expression]; // 事件回调方法

    if (eventType[1] && typeof fn === 'function') {
      // 直接绑定方法的
      node.addEventListener(eventType[1], fn.bind(vm), false);
    } else {
      // 找不到方法名的可能是带参数的
      var match = paramsRE.exec(expression),
          fnName = expression.replace(match[0], ''),
          // 替换掉参数
      paramNames = match[1].split(','),
          params = [];

      fn = vm.$options.methods[fnName];

      paramNames.forEach(function (name) {
        name = name.trim();
        var stringMatch = stringRE.exec(name); // 参数有可能是字符串，有可能是变量

        if (stringMatch) {
          params.push(stringMatch[1]);
        } else {
          // params.push(vm[name]) // 直接取值了
          params.push(_this5._getVMVal(vm, name));
        }
      });

      node.addEventListener(eventType[1], function (e) {
        return fn.apply(vm, params);
      }, false); //apply 参数是数组
    }
  },
  _getVMVal: function _getVMVal(vm, expression) {
    var value = vm;

    expression = expression.trim();
    expression = expression.split('.');

    expression.forEach(function (key) {
      if (value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        throw new Error("Can not find the property: " + key);
      }
    });

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      return JSON.stringify(value); // 对象的话这里给了 JSON 的字符串
    } else {
      return value;
    }
  },
  _setVMVal: function _setVMVal(vm, expression, value) {
    expression = expression.trim();
    var data = vm._data; // 为啥不直接给 vm 上设置，只设置 vm._data 不是不能更新嘛
    expression = expression.split('.');
    expression.forEach(function (key, index) {
      if (index === expression.length - 1) {
        data[key] = value;
      } else {
        data = data[key];
      }
    });
  }
};

var updater = {
  textUpdater: function textUpdater(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  htmlUpdater: function htmlUpdater(node, value) {
    if (node.$parent) {
      // 这里是 {{{}}} 进来的解析，node 是个空节点
      var cacheDiv = document.createElement('div'); // 临时缓存节点，TODO: 为什么不用 fragment？试一下

      cacheDiv.innerHTML = value;
      var childNodes = cacheDiv.childNodes;
      var doms = [];

      var len = childNodes.length;
      var tempNode = void 0;

      if (node.$oncetime) {
        // 这里是 第一次 初始化 html 的解析
        while (len--) {
          // 为了删除旧节点，记录 $doms
          tempNode = childNodes[0];
          node.appendChild(tempNode); // tempNode 此时已经从 childNodes 中转移到 node（删除了）
          doms.push(tempNode);
        }

        node.$doms = doms;
        node.$oncetime = false;
      } else {
        // update 的 html 更新解析
        var newFragment = document.createDocumentFragment();
        while (len--) {
          tempNode = childNodes[0];
          newFragment.appendChild(tempNode);
          doms.push(tempNode);
        }

        node.$parent.insertBefore(newFragment, node.$doms[0]); // 这里唯一引用了 $dom
        node.$doms.forEach(function (childNode) {
          node.$parent.removeChild(childNode);
        });

        // 保存下次删除旧节点
        node.$doms = doms;
      }
    } else {
      // 这里是 v-html
      node.innerHTML = typeof value === 'undefined' ? '' : value;
    }
  },
  classUpdater: function classUpdater(node, value, oldValue) {
    // className 修改，这里需要 oldValue
    var nodeNames = node.className;
    if (oldValue) {
      nodeNames = nodeNames.replace(oldValue, '').replace(/\s$/, ''); // 删掉旧 value，清掉结尾空格
    }
    var space = nodeNames && value ? ' ' : '';
    node.className = nodeNames + space + value;
  },
  modelUpdater: function modelUpdater(node, value) {
    // 这里都是 form 表单元素
    node.value = typeof value === 'undefined' ? '' : value;
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _watcher = __webpack_require__(0);

var _watcher2 = _interopRequireDefault(_watcher);

var _observer = __webpack_require__(1);

var _observer2 = _interopRequireDefault(_observer);

var _compiler = __webpack_require__(4);

var _compiler2 = _interopRequireDefault(_compiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MVVM = function () {
  function MVVM(options) {
    var _this = this;

    _classCallCheck(this, MVVM);

    this.$options = options;
    this._data = options.data;
    // 将 vm 的数据关联到 vm._data 上
    Object.keys(options.data).forEach(function (key) {
      _this._proxy(key);
    });

    // 开始监听所有的数据
    (0, _observer2.default)(this._data);

    // 编译节点，添加 watcher
    this.$compiler = new _compiler2.default(options.el || document.body, this); // body 是备选
  }

  _createClass(MVVM, [{
    key: '$watch',
    value: function $watch(expresstion, callback) {
      new _watcher2.default(this, expresstion, callback);
    }
  }, {
    key: '_proxy',
    value: function _proxy(key) {
      Object.defineProperty(this, key, {
        configurable: false, // 不可修改了
        enumerable: true,
        get: function get() {
          return this._data[key];
        },
        set: function set(newValue) {
          this._data[key] = newValue;
        }
      });
    }
  }]);

  return MVVM;
}();

window.MVVM = MVVM;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayMethods = undefined;

var _util = __webpack_require__(3);

// 简化原型
var arrayProto = Array.prototype;

// 继承至数组，待会覆盖方法
var arrayMethods = exports.arrayMethods = Object.create(arrayProto);

// 这里都是改变自身的方法
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // 这里要注意不要用 => 函数，保存 this 指向

  var original = arrayProto[method]; // 缓存原始方法

  // 覆盖原始方法
  (0, _util.def)(arrayMethods, method, function () {
    // 处理参数数组
    var args = [].slice.call(arguments);

    var result = original.apply(this, args); // this 为 data 数组
    // 插入副作用
    var ob = this.__ob__; // data 的 observer 对象，见 observer

    // 取出添加的新值
    var inserted = void 0;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }

    // 监听新值，如果是对象就有效果
    inserted && ob.observerArray(inserted);

    // 每次触发数组对象的 dep 发布事件
    ob.dep.notify();

    return result;
  });
});

/**
 数组方法调用的副作用
 ob.observerArray(newValue)
 ob.dep.notify()
 **/

/***/ })
/******/ ]);