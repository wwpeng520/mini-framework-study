export default function createStore(reducer, preloadedState, enhancer) {
  // 第二个参数 [preloadedState] (any)是可选的: initial state
  // 第三个参数 enhancer(function) 也是可选的：用于添加中间件的
  // 当第二个参数没有传 preloadedState，而直接传 function 的话，就会直接把这个 function 当成 enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  // 当第三个参数传了但不是 function 也会报错
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }
    // 加强 dispatch
    // enhancer: applyMiddleware(thunk, promise, logger)
    // 柯理化
    return enhancer(createStore)(reducer, preloadedState);
  }

  // reducer 必须为函数
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  // 开辟一个空间存储状态
  let currentState = preloadedState;
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
