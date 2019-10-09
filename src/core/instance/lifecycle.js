import { createVnode } from '../vdom/create-vnode'
import { patch } from '../vdom/patch'
import Watcher from '../observer/watcher';

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    
    vm.$el = vm.__patch__(vm.$el, vnode)
  }

  /**
   * @description 用虚拟dom创建真实的dom渲染到页面上
   * @param {object} oldVnode
   * @param {object} vnode 
   * @return 真实的dom
   */
  Vue.prototype.__patch__ = patch
}

export function mountComponent(vm, el) {
  vm.$el = el
  console.log(vm.$options.render.toString())
  const updateComponent = () => {
    const vnode = vm.$options.render.call(vm, (a, b, c, d) => {
      return createVnode(vm, a, b, c, d, true)
    })
    vm._update(vnode)
    console.log(vnode)
  }

  new Watcher(vm, updateComponent, null, null, true)
}
