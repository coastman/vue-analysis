

export function initExtend(Vue) {
  Vue.cid = 0
  let cid = 1

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
  }
}