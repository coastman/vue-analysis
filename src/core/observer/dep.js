export default class Dep {
    constructor() {
      this.subs = []
    }

    depend() {
      if (Dep.target) {
        Dep.target.addDep(this)
      }
    }

    addSub(sub) {
      this.subs.push(sub)
    }

    notify() {
      const subs = this.subs.slice()
      for (let i = 0; i < subs.length; i++) {
        subs[i].update()
      }
    }
  }

Dep.target = null
const targetStack = []

export function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}