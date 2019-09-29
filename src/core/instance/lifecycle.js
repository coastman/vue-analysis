import { createVnode } from '../vdom/create-vnode'
import { patch } from '../vdom/patch'

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

  const vnode = vm.$options.render((a, b, c, d) => {
    return createVnode(vm, a, b, c, d, true)
  })
  console.log(vnode)
  
  vm._update(vnode)
}
