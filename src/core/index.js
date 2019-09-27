import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { mountComponent } from './instance/lifecycle'

Vue.prototype.$mount = function (el) {
  const selected = document.querySelector(el)
  return mountComponent(this, selected)
}

initGlobalAPI(Vue)
/**
 * 此时Vue函数上挂载了util，options，set， nextTick，delete，extend，mixin，use，component，filter，directive方法
 * util包含mergeOptions，defineReactive函数
 * options包含components, directives, filters对象，以及_base属性指向Vue构造
 */
export default Vue
