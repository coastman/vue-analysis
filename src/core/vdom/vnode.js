export default class VNode {
  constructor(tag, data, children, text, elm, context) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.context = context
  }
}

// 创建文本vnode
export function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

export function emptyNodeAt(elm) {
  return new VNode(elm.tagName.toLowerCase(), {}, [], undefined, elm)
}
