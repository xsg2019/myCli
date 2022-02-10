/*
 * localStorage and sessionStorage
 * @Author: Chris Liu
 * @Date: 2020-03-13 13:45:46
 * @Last Modified by: your name
 * @Last Modified time: 2020-04-14 16:36:44
 */

/**
 *
 * 序列化与反序列化
 * @param {*} val
 * @returns
 */
function serialize(val: any) {
  return JSON.stringify(val)
}
function deserialize(val: any) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch {
    return val || undefined
  }
}

class store {
  public storage: any

  constructor(storage: any) {
    this.storage = storage
  }
  set(key: string, val: any) {
    if (val === undefined) {
      return this.remove(key)
    }
    this.storage.setItem(key, serialize(val))
    return val
  }
  get(key: string, def?: string) {
    let val = deserialize(this.storage.getItem(key))
    return val === undefined ? def : val
  }

  has(key: string) {
    return this.get(key) !== undefined
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  getAll() {
    let obj = {}
    this.forEach((key, val) => {
      obj[key] = val
    })
    return obj
  }

  forEach(cb: (key: string, val: any) => void) {
    for (let i = 0; i < this.storage.length; i++) {
      let key = this.storage.key(i)
      cb(key, this.get(key))
    }
  }
}

export const storage = new store(window.localStorage)

export const sesstion = new store(window.sessionStorage)
