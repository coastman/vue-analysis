import {
  extend,
  hasOwn,
  isPlainObject
} from './index'

/**
 * @param {object} parent 必填
 * @param {object} child 必填
 * @param {*} vm 非必填
 * @return {object}
 */
const strats = {}
const defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
}

export function mergeOptions (parent, child, vm) {
  // 校验组件名称是否合法
  checkComponents(child)
  // 序列化props
  normalizeProps(child, vm)
  // 序列化inject
  normalizeInject(child, vm)
  // 序列化指令
  normalizeDirectives(child)

  // TODO...
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0; i < child.mixins.length; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  // 遍历Vue构造函数上的属性，如filters，components, directives, _base
  // 如果子options中有相同的属性， 则子options的属性为主。
  for (key in parent) {
    mergeField(key)
  }

  // 遍历子options中的属性
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }

  // 最终返回合并后的options
  return options
}

function checkComponents (options) {
  for (const key in options.components) {
    validateComponentName(key)
  }
}

/**
 * @description 校验组件名 
 * @return undefined
 */
export function validateComponentName(name) {
  if (!name) {
    const err = '校验不通过'
    console.error(err)
  }
  // ...后面还有检验是否为html标签等
}

/**
 * @description 序列化props
 * @param {object} options 子组件
 * @return undefined
 */
function normalizeProps (options, vm) {
  const props = options.props
  if (!props) return
  const res = {}
  let i, val, name

  if (Array.isArray(props)) {
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        name = val
        res[name] = { type: null }
      }
    }
  } else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = val
      res[name] = isPlainObject(val) ? val : { type: val }
    }
  } else {
    const err = 'Invalid value for option "props": expected an Array or an Object'
    console.error(err)
  }
  options.props = res
}

/**
 * @description 序列化inject
 * @param {*} options 
 * @param {*} vm 
 */
function normalizeInject (options, vm) {
  const inject = options.inject
  if (!inject) return
  const normalized = options.inject = {}

  if (Array.isArray(inject)) {
    for (let i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] }
    }
  } else if (isPlainObject(inject)) {
    for (const key in inject) {
      const val = inject[key]
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val }
    }
  } else {
    const err = 'Invalid value for option "inject": expected an Array or an Object'
    console.error(err)
  }
}

/**
 * @description 序列化指令
 * @param {*} options
 */
function normalizeDirectives (options) {
  const dirs = options.directives
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key]
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def }
      }
    }
  }
}