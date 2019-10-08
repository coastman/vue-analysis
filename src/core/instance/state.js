import {
  set,
  del,
  observe,
} from '../observer/index'
import { isPlainObject } from '../utils';

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: null,
  set: null
}

export function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

// 初始化data
export function initState(vm) {
  const opts = vm.$options 
  if (opts.data) {
    initData(vm)
  }
}

export function stateMixin(Vue) {
  const dataDef = {}
  dataDef.get = function () {
    return this._data
  }

  const propsDef = {}
  propsDef.get = function () {
    return this._props
  }

  dataDef.set = function () {
    const err = 'Avoid replacing instance root $data. Use nested data properties instead.'
    console.error(err)
  }

  propsDef.set = function () {
    const err = '$props is readonly.'
    console.error(err)
  }
  
  // 向Vue的原型上添加 $data, $props属性，读取时返回自身实例的data和props， 修改时抛出异常 
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  // 向Vue原型上添加 $set， $delete 方法
  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  // 向Vue原型上添加 $watch 方法
  Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    
    // TODO
    // options = options || {}
    // options.user = true
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }

  if (typeof handler === 'string') {
    handler = vm[handler]
  }

  return vm.$watch(expOrFn, handler, options)
}

// 为data做一层代理，修改this指向，并且把data中的属性变成响应式数据
function initData(vm) {
  let data = vm.$options.data
  vm._data = data || {}
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    proxy(vm, '_data', key)
  }
  observe(data, true)
}