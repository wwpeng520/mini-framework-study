import { iterator, promise } from './is';
import { TAKE, PUT, CALL, FORK, ALL } from './effectTypes';
import proc from './proc';

function runTakeEffect(env, { channel = env.channel, pattern }, cb) {
  const matcher = (input) => input.type === pattern;
  channel.take(cb, matcher);
}

function runPutEffect(env, { action }, cb) {
  const result = env.dispatch(action);
  cb(result);
}

function runCallEffect(env, { fn, args }, cb) {
  const result = fn.apply(null, args);
  if (promise(result)) {
    result.then((data) => cb(data)).catch((error) => cb(error, true));
    return;
  }

  if (iterator(result)) {
    proc(env, result, cb);
    return;
  }

  cb(result);
}

function runForkEffect(env, { fn, args }, cb) {
  // 先执行fn，fn是  generator函数，执行 fn 先拿到遍历器对象，然后再执行遍历器对象的 next
  const taskIterator = fn.apply(null, args);
  proc(env, taskIterator);
  cb();
}

function runAllEffect(env, effects, cb) {
  const len = effects.length;
  for (let i = 0; i < len; i++) {
    proc(env, effects[i]);
  }
}

const effectRunnerMap = {
  [TAKE]: runTakeEffect,
  [PUT]: runPutEffect,
  [CALL]: runCallEffect,
  [FORK]: runForkEffect,
  [ALL]: runAllEffect,
};
export default effectRunnerMap;
