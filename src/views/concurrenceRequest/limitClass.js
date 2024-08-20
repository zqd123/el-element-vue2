/**
 * 核心思想就是在并发数大于限制的时候，暂时先把操作放入通过promise组装一下，然后放入数组，
 * 每次执行完异步回调后就将操作按先入先出的顺序取出，然后执行，保证最大并发数在限制范围内。
 */

export class LimitPromise {
    constructor (limit) {
      this._limit = limit // 最大限制数
      this._count = 0 // 目前并发的数量
      this._taskQueue = [] // 如果并发数等于最大限制，则把新加的异步操作用数组存起来
    }
  }
   
  LimitPromise.prototype.call = function (asyncFn, ...args) {
    return new Promise((resolve, reject) => {
      const task = this.createTask(asyncFn, args, resolve, reject)
      if (this._count >= this._limit) {
        this._taskQueue.push(task)
      } else {
        task()
      }
    })
  }
   
  LimitPromise.prototype.createTask = function (asyncFn, args, resolve, reject) {
    return () => {
      asyncFn(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this._count--
          if (this._taskQueue.length) {
            let task = this._taskQueue.shift()
            task()
          }
        })
   
      this._count++
    }
  }