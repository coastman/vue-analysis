import { isTrue, isDef, isPrimitive } from '../utils/index'
import { createVnode } from '../vdom/create-vnode'
import VNode from '../vdom/vnode'

function emptyNodeAt(elm) {
  return new VNode(elm.tagName.toLowerCase(), {}, [], undefined, elm)
}

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    debugger
    const vm = this
    const prevEl = vm.$el
    
    vm.$el = vm.__patch__(vm.$el, vnode)
  }

  /**
   * @description 用虚拟dom创建真实的dom渲染到页面上
   * @param {object} oldVnode
   * @param {object} vnode 
   * @return 真实的dom
   */
  Vue.prototype.__patch__ = function (oldVnode, vnode) {
    const isRealElement = isDef(oldVnode.nodeType)
    if (isRealElement) {
      oldVnode = emptyNodeAt(oldVnode)
    }
    const oldElm = oldVnode.elm
    const parentElm = oldElm.parentNode
    debugger
  
    createElm(
      vnode,
      parentElm,
      oldElm.nextSibling
    )
    if (isDef(parentElm)) {
      // body 
      removeVnodes(parentElm, [oldVnode], 0, 0)
    } else if (isDef(oldVnode.tag)) {

    }
    return vnode.elm
  }
}

function removeVnodes(parentElm, vnodes, startIndex, endIndex) {
  for (; startIndex <= endIndex; ++startIndex) {
    const ch = vnodes[startIndex];
    if (isDef(ch)) {
      if (isDef(ch.tag)) {
        removeAndInvokeRemoveHook(ch)
      } else {
      }
    }
  }
}

function removeAndInvokeRemoveHook(vnode) {
  removeNode(vnode.elm)
}

function removeNode(el) {
  const parent = el.parentNode
  parent.removeChild(el)
}

function createElm(vnode, parentElm, refElm) {
  // div [] body h1
  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  debugger

  if (isDef(tag)) {
    vnode.elm = document.createElement(tag)
    createChildren(vnode, children)
    insert(parentElm, vnode.elm, refElm)
  } else {
    vnode.elm = document.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}

function createChildren(vnode, children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      createElm(children[i], vnode.elm, null)
    }
  } else if (isPrimitive(vnode.text)) {
    vnode.elm.appendChild(document.createTextNode(String(vnode.text)))
  }
}

function insert(parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (ref.parentNode === parent) {
        parent.insertBefore(elm, ref)
      }
    } else {
      parent.appendChild(elm)
    }
  }
}

export function mountComponent(vm, el) {
  vm.$el = el

  const vnode = vm.$options.render((a, b, c, d) => {
    return createVnode(vm, a, b, c, d, true)
  })
  console.log(vnode)
  
  vm._update(vnode)
}
