import { iterator, promise } from './is';
import * as effectTypes from './effectTypes';
import proc from './proc';

// { type: 'TAKE', payload: { pattern: 'LOGIN_SAGA' } }
function runTakeEffect(env, payload, next) {
  const matcher = (action) => action.type === payload.pattern;
  // channel.take：订阅（根据 matcher）
  env.channel.take(next, matcher);
}

// { type: 'PUT', payload: { action: { type: 'LOGIN', payload: ... } } }
function runPutEffect(env, payload, next) {
  // middleware.js 里增强了 dispatch 并执行了 channel.put(...)
  const result = env.dispatch(payload.action);
  next(result);
}

// 阻塞
function runCallEffect(env, payload, next) {
  const result = payload.fn.apply(null, payload.args);
  if (promise(result)) {
    result.then((data) => next(data)).catch((error) => next(error, true));
    return;
  }

  if (iterator(result)) {
    proc(env, result, next);
    return;
  }

  next(result);
}

// 非阻塞
function runForkEffect(env, payload, next) {
  // 先执行fn，fn是 generator 函数，执行 fn 先拿到遍历器对象，然后再执行遍历器对象的 next
  const taskIterator = payload.fn.apply(null, payload.args);
  proc(env, taskIterator);
  next();
}

function runAllEffect(env, payload, next) {
  const len = payload.length;
  for (let i = 0; i < len; i++) {
    proc(env, payload[i]);
  }
}

const effectRunnerMap = {
  [effectTypes.TAKE]: runTakeEffect,
  [effectTypes.PUT]: runPutEffect,
  [effectTypes.CALL]: runCallEffect,
  [effectTypes.FORK]: runForkEffect,
  [effectTypes.ALL]: runAllEffect,
};

export default effectRunnerMap;
