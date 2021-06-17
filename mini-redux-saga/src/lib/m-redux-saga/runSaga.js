import proc from './proc';

export default function runSaga({ channel, dispatch, getState }, saga, ...args) {
  const iterator = saga(...args);
  const env = { channel, dispatch, getState };

  proc(env, iterator);
}
