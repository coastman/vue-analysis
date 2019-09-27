import { isTrue, isDef } from '../utils/index'

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2


export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    const prevEl = vm.$el
    
    vm.$el = vm.__patch__(vm.$el, vnode, false, false /* removeOnly */)

  }

  Vue.prototype.__patch__ = function (oldVnode, vnode, hydrating, removeOnly) {
    const isRealElement = isDef(oldVnode.nodeType)
    const oldElm = oldVnode.elm
    const parentElm = oldElm.parentNode
  
    // createElm(
    //   vnode,
    //   insertedVnodeQueue,
    //   oldElm._leaveCb ? null : parentElm,
    //   nodeOps.nextSibling(oldElm)
    // )
  }
}

export function mountComponent(vm, el) {
  vm.$el = el
  const vnode = vm.$options.render((a, b, c, d) => {
    return createElement(vm, a, b, c, d, true)
  })
  vm._update(vnode)
  // updateComponent(el.$options.render)
}


export function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  // p ['hello']
  if (Array.isArray(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  // vm, p, undefined, ['hello'], 2
  return _createElement(context, tag, data, children, normalizationType)
}

export function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  }

  let vnode
  if (typeof tag === 'string') {
    vnode = new VNode(
      tag, data, children,
      undefined, undefined, context
    )
  }
  console.log(vnode)
  return vnode
}

function normalizeChildren(children) {
  const res = []
  let i, c, lastIndex, last
  for (i = 0; i < children.length; i++) {
    c = children[i]
    lastIndex = res.length - 1
    last = res[lastIndex]
    res.push(createTextVNode(c))
  }
  return res
}

export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

export default class VNode {
  constructor (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  get child () {
    return this.componentInstance
  }
}