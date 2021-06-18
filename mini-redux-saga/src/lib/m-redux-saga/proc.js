import effectRunnerMap from './effectRunnerMap';

/**
 * co 的原理：自动运行迭代器
 * @param {*} env:{ channel, dispatch, getState }
 * @param {*} iterator
 */
export default function proc(env, iterator) {
  next();

  // iterator eg.
  // 1.take(COUNT_INCREASE_SAGA)
  // 2.put({ type: COUNT_INCREASE })

  function next(arg) {
    let result; // {done: false, value: { type: 'TAKE', payload: { pattern: 'LOGIN_SAGA' } } }
    result = iterator.next(arg);
    // result
    // 第一次：result 为 undefined，执行 take(COUNT_INCREASE_SAGA)
    // 返回 { done: false, value: { type: 'TAKE', payload: { pattern: 'LOGIN_SAGA' } } }
    // 第二次：done 为 false，执行 put({ type: COUNT_INCREASE })
    // 返回 { done: false, value: { type: 'PUT', payload: { action: { type: 'LOGIN', payload: ... } } }
    // 第三次：done 为 false，继续执行到结束：{ done: true, value: undefined }
    if (!result.done) {
      runEffect(result.value, next);
    }
  }

  function runEffect(effect, next) {
    if (effect) {
      // effect.type: TAKE, PUT, ...
      const effectRunner = effectRunnerMap[effect.type];
      effectRunner(env, effect.payload, next);
    } else {
      next();
    }
  }
}
