import Dep, { pushTarget, popTarget } from './dep'
import { nextTick } from '../utils';

export default class Watcher {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    // vm._watchers.push(this)
    this.cb = cb
    this.deps = []
    this.newDeps = []
    this.getter = expOrFn
    this.value = this.get()
  }

  get() {
    pushTarget(this)
    let value
    const vm = this.vm
    value = this.getter.call(vm, vm)
    popTarget()
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
  // cleanupDeps() {
  //   let i = this.deps.length
  // }
}

const queue = []
let flushing = false

export function queueWatcher(watcher) {
  queue.push(watcher)
  nextTick(flushSchedulerQueue)
}

function flushSchedulerQueue() {
  flushing = true
  let watcher
  for (let i = 0; i < queue.length; i++) {
    watcher = queue[i]
    watcher.run()
  }
}