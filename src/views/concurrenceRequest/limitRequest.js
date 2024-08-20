/**
 * 请求并发控制
 * @param {number} limit 并发数
 * @returns
 */
export function useLimitRequest(limit = 5) {
  const limitConfig = {
    limit: limit,
    count: 0,
    taskQueue: [],
  };
  function call(asyncFn, ...args) {
    return new Promise((resolve, reject) => {
      const task = createTask(asyncFn, args, resolve, reject);
      if (limitConfig.count >= limitConfig.limit) {
        limitConfig.taskQueue.push(task);
      } else {
        task();
      }
    });
  }
  function createTask(asyncFn, args, resolve, reject) {
    return () => {
      asyncFn(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          limitConfig.count--;
          if (limitConfig.taskQueue.length) {
            let task = limitConfig.taskQueue.shift();
            task();
          }
        });

      limitConfig.count++;
    };
  }
  return {
    call,
    limitConfig,
  };
}
