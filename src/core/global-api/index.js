import { 
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../utils/index'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from '../../shared/constants'
import { initMixin } from './mixin'
import { initExtend } from './extend'

export function initGlobalAPI (Vue) {
  Vue.util = {
    extend,
    mergeOptions,
    defineReactive
  }

  /*
   向Vue上挂载set，delete，nextTick函数
  */
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })
  Vue.options._base = Vue

  // 向options下的components拷贝keepAllive
  // extend(Vue.options.components, builtInComponents)
  // initUse(Vue)

  // 向Vue的构造函数上挂上mixin方法
  initMixin(Vue)
  // 向Vue的构造函数上挂上extend方法
  initExtend(Vue)
  // 向Vue的构造函数上挂component，filter，directive方法
  // initAssetRegisters(Vue)
}