import { isDef, isPrimitive } from '../utils/index'
import { emptyNodeAt } from './vnode'

export function patch(oldVnode, vnode) {
  const isRealElement = isDef(oldVnode.nodeType)
  if (isRealElement) {
    oldVnode = emptyNodeAt(oldVnode)
  }

  const oldElm = oldVnode.elm
  const parentElm = oldElm.parentNode
  
  createElm(vnode, parentElm, oldElm.nextSibling)
  if (isDef(parentElm)) {
    parentElm.removeChild(oldElm)
  }
  return vnode.elm
}

function createElm(vnode, parentElm, refElm) {
  const children = vnode.children
  const tag = vnode.tag

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
    const childTextNode = document.createTextNode(String(vnode.text))
    vnode.elm.appendChild(childTextNode)
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
