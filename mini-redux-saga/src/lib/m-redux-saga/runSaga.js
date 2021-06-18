import proc from './proc';

export function runSaga({ channel, dispatch, getState }, saga, ...args) {
  const env = { channel, dispatch, getState };
  // saga 为单个 saga 或者用「all」合成的 saga，执行获取遍历器对象
  const iterator = saga(...args);

  // 把遍历器对象和参数传递给 proc 执行
  proc(env, iterator);
}
