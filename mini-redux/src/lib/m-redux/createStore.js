export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // 加强 dispatch
    // enhancer: applyMiddleware(thunk, promise, logger)
    // 柯理化
    return enhancer(createStore)(reducer);

    // return enhancer(createStore, reducer);
  }

  // 开辟一个空间存储状态
  let currentState;
  // 监听函数
  let currentListeners = [];

  // get state
  function getState() {
    return currentState;
  }

  // set state
  function dispatch(action) {
    // 修改 state
    currentState = reducer(currentState, action);
    // state改变，执行订阅的函数
    currentListeners.forEach((listener) => listener());
  }

  // 订阅和取消订阅必须要成对出现
  function subscribe(listener) {
    currentListeners.push(listener);

    return () => {
      currentListeners = currentListeners.filter((item) => item !== listener);
    };
  }

  // 手动执行 dispatch，加上默认值
  dispatch({ type: '@@REDUX/INIT' });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
