const callbacks = []
let pending = false

function flushCallbacks() {
  pending = false
  const copis = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copis.length; i++) {
    copis[i]()
  }
}

let timerFunc

if (typeof Promise !== undefined) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
  isUsingMicroTask = true
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick(cb, ctx) {
  let _resolve
  // 数组push 回调函数
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        console.error(e)
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== undefined) {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

/**
 * callbacks 是一个异步任务队列， 基于环境判断是微任务还是宏任务
 * 1. 数组放入callback函数 pending = true
 * 2. 调用timerFunc()
 *    const timerFunc = Promise.resolve().then(function flushCallbacks() {
 *      pending = false
 *      const copis = callbacks.slice(0)
 *      遍历 copis 循环调用callback
 *    })
 * 所以调用nextTick的机制是用一个数组存放传入的cb函数，然后异步遍历整个数组调用每个cb函数
 */