import { MATCH } from './symbols';

// channel 是 redux-saga 保存回调和触发回调的地方，类似于发布订阅模式
export function stdChannel() {
  let currentTakers = [];

  /**
   * 订阅
   * @param {*} cb 回调函数
   * @param {*} matcher 匹配器
   */
  function take(cb, matcher) {
    // 将 matcher 作为属性放到了回调函数上，这么做的原因是为了让外部可以自定义匹配方法，而不是简单的事件名称匹配。
    // redux-saga 本身就支持好几种匹配模式，包括字符串，Symbol，数组等。
    cb[MATCH] = matcher;
    // take 只触发一次
    cb.cancel = () => {
      currentTakers = currentTakers.filter((item) => item !== cb);
    };
    currentTakers.push(cb);
  }

  /**
   * 发布: put(action)
   * @param {*} input -- action
   */
  function put(input) {
    for (let i = 0; i < currentTakers.length; i++) {
      const taker = currentTakers[i];
      const matcher = taker[MATCH];
      if (matcher(input)) {
        taker.cancel();
        taker(input);
      }
    }
  }

  return { take, put };
}

// let channel = stdChannel();
// function next(input) {
//   console.log('继续执行: ', input);
// }
// function matcher(input) {
//   return input.type === 'ASYNC_ADD';
// }
// channel.take(next, matcher);
// channel.put({ type: 'ASYNC_ADD' });
