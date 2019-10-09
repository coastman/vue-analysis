import { 
  isObject,
  def,
  hasOwn, 
  isPlainObject, 
  isUndef, 
  isPrimitive, 
  isValidArrayIndex 
} from '../utils/index'
import VNode from '../vdom/vnode'
import Dep from './dep'


export let shouldObserve = true

export class Oberver {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observerArray(value, arrayMethods, arrayKeys)
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  observerArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }
}

export function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) return

  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Oberver) {
    ob = value.__ob__
  } else if (
    shouldObserve 
    && (Array.isArray(value) || isPlainObject(value))
    && Object.isExtensible(value)
    && !value._isVue
  ) {
    ob = new Oberver(value)
  }
  // if (asRootData && ob) {
  //   ob.vmCount++
  // }
  return ob
}

export function defineReactive (obj, key, val, customSetter, shallow) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) return

  const getter = property && property.get
  const setter = property && property.setter
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (customSetter) {
        customSetter()
      }
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

export function set(target, key, val) {
  if (isUndef(target) || isPrimitive(target)) {
    const err = `Cannot set reactive property on undefined, null, or primitive value: ${target}`
    console.error(err)
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }

  const ob = target.__ob__
  if (ob._isVue || (ob && ob.vmCount)) {
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

export function del(target, key) {
  if (isUndef(target) || isPrimitive(target)) {
    const err = `Cannot set reactive property on undefined, null, or primitive value: ${target}`
    console.error(err)
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }

  const ob = target.__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    const err = 'Avoid deleting properties on a Vue instance or its root $data - just set it to null.'
    console.error(err)
    return
  }

  if (!hasOwn(target, key)) return

  delete target[key]
  if (!ob) return
  ob.dep.notify()
}
