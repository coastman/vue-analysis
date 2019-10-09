export * from './options'
export * from './next-tick'
export { defineReactive } from '../observer/index'

export function extend (to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

const _toString = Object.prototype.toString

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isUndef(v) {
  return v === undefined || v === null
}

export function isPrimitive (v) {
  return typeof v === 'string' 
      || typeof v === 'number'
      || typeof v === 'symbol' 
      || typeof v === 'boolean'
}

export function isValidArrayIndex (val) {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

export function isTrue (v) {
  return v === true
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}
