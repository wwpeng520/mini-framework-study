import { stdChannel } from './channel';
import { runSaga } from './runSaga';

// 中间件其实是对 store.dispatch 的改造和增强
// 中间件格式
// function xxxMiddleware({ dispatch, getState }) {
//   return (next) => (action) => {
//     return next(action);
//   };
// }
export default function sagaMiddlewareFactory({
  //  context = {}, channel = stdChannel(), sagaMonitor,
  ...options
} = {}) {
  const channel = stdChannel();
  let boundRunSaga;

  function sagaMiddleware({ getState, dispatch }) {
    const env = { channel, getState, dispatch }
    // 把 env 绑定为 boundRunSaga 的第一个参数
    boundRunSaga = runSaga.bind(null, env);
    return (next) => (action) => {
      const result = next(action);
      // 调用 dispatch 的时候，除了调用老的 store.dispatch，还需要调用 channel.put 方法
      channel.put(action);
      return result;
    };
  }

  // 说明了只能用于在 applyMiddleware 阶段之后执行 Saga，..args其实就是 saga
  sagaMiddleware.run = (...args) => boundRunSaga(...args);
  return sagaMiddleware;
}
