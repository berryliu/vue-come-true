import Watcher from './watcher';

let uid = 0;

// 通知者
export default class Dep {
  static target; // 当前 watcher

  constructor () {
    this.id = uid++;  // 每一个 data 有一个通知者
    this.subs = [];
  }

  addSub (sub) {  // 添加 watcher
    this.subs.push(sub);
  }

  removeSub (sub) {
    let index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  }


  depend () { // 将 当前 添加到该通知者（调用当前观察者的 addDep 方法，从而间接调用通知者的 addSub 方法添加观察者。。。为什么要这么绕？）
    Dep.target.addDep(this);
  }

  notify () { // 通知所有观察者 更新
    this.subs.forEach(sub => sub.update());
  }
}