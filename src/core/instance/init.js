import { extend, mergeOptions } from '../utils/index'

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.log(options.render)
    // vm 指向当前实例的化的vue
    const vm = this
    vm._isVue = true

    if (options && options._isComponent) {
      // initInternalComponent(vm, options)
    } else {
      // 合并Vue构造函数的options和传入的options
      // Vue的options包含components, directives, filters对象，以及_base属性指向Vue构造
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    vm._self = vm
    debugger
    vm.$mount(vm.$options.el)
  }
}

export function resolveConstructorOptions(Ctor) {
  let options = Ctor.options
  if (Ctor.super) {
  }
  return options
}