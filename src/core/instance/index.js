import { initMixin } from './init'
import { stateMixin } from './state'
import { lifecycleMixin } from './lifecycle'

function Vue (options) {
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
lifecycleMixin(Vue)

export default Vue
