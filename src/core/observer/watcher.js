import Dep, { pushTarget, popTarget } from './dep'
import { nextTick } from '../utils';

let uid = 0

export default class Watcher {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    // vm._watchers.push(this)
    this.cb = cb
    this.id = ++uid
    this.deps = []
    this.newDeps = []
    this.getter = expOrFn
    this.value = this.get()
  }

  get() {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (error) {
      throw error
    } finally {
      popTarget()
    }
    // this.cleanupDeps()
    return value
  }

  addDep(dep) {
    dep.addSub(this)
  }

  update() {
    queueWatcher(this)
  }

  run() {
    const value = this.get()
  }
}

const queue = []
let flushing = false
let has = {}
let waiting = false
let i = 0

export function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      debugger
      let j = queue.length - 1
      while (j > i && queue[j].id > watcher.id) {
        j--
      }
      queue.splice(j + 1, 0, watcher)
    }
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}

function flushSchedulerQueue() {
  flushing = true
  let watcher, id
  for (i = 0; i < queue.length; i++) {
    watcher = queue[i]
    id = watcher.id
    has[id] = null
    watcher.run()
  }
  resetSchedulerState()
}

function resetSchedulerState() {
  i = queue.length = 0
  has = {}
  waiting = flushing = false
}