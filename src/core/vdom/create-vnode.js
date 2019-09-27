import { isTrue, isDef, isPrimitive } from '../utils/index'
import VNode from './vnode'

const ALWAYS_NORMALIZE = 2

/**
 * @description 根据传递的参数个数，模拟函数重载
 * @param {vm} context 当前上下文vm实例
 * @param {string} tag 标签 
 * @param {any} data 相关数据
 * @param {array} children 子节点 
 * @param {any} normalizationType 
 * @param {any} alwaysNormalize
 * @return {function} 返回一个创建vnode对象的函数 
 */
export function createVnode(
  context,           // 当前上下文vm实例
  tag,               // 标签
  data,              // 相关数据
  children,          // 子节点
  normalizationType,
  alwaysNormalize
) {
  // isPrimitive 判断是否为基础类型
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }

  return _createVnode(context, tag, data, children, normalizationType)
}

/**
 * @description 创建vnode对象
 * @param {vm} context 当前上下文vm实例
 * @param {string} tag 标签 
 * @param {any} data 相关数据
 * @param {array} children 子节点 
 * @param {any} normalizationType 
 * @return {object} 返回vnode对象
 */
function _createVnode(context, tag, data, children, normalizationType) {
  if (normalizationType === ALWAYS_NORMALIZE) {
    // 把children变成vnode数组
    children = normalizeChildren(children)
  }
  let vnode
  if (typeof tag === 'string') {
    vnode = new VNode(tag, data, children, undefined, undefined, context)
  }
  return vnode
}

function normalizeChildren(children) {
  const res = []
  let i, c
  for (let i = 0; i < children.length; i++) {
    c = children[i]
    if (isPrimitive(c)) {
      res.push(createTextVNode(c))
    }
  }
  return res
}

// 创建文本vnode
function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val))
}
