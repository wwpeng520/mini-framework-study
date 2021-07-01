export default function applyMiddleware(...middlewares) {
  // middlewares: thunk 等函数的数组
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const midProps = {
      getState: store.getState,
      // dispatch,
      dispatch: (...args) => dispatch(...args),
    };

    // middlewaresChain 是个能够访问 store 的中间件数组
    // 传入 midProps 使得中间件获得了访问 store 的能力（获取 state 和 执行 dispatch 的权限）
    // midProps 中的 dispatch 是个箭头函数，而不是 store 原有的 dispatch
    // 中间件真正执行 dispatch 的时候才去获取当前中间件所被加强后的 dispatch

    // a.例如 logger 执行 dispatch(action)，这里的 action 如果是异步的，那 store 原有的 dispatch 是不支持异步的，那就失败了。
    // 实际上这里异步的 action 交给了 thunk 处理，返回的是正常的普通对象。所以 logger 需要放在 applyMiddleware 的最后一个参数
    // 所以 midProps 中的 dispatch 只是一个获取增强后 dispatch 的方法。

    // b.logger 放在最后原因「Otherwise it'll log thunks and promises but not actual actions.」
    // logger 肯定要在 store.dispatch 的前后 console，还记不记得上面哪个中间件拿到了 store.dispatch，就是最后一个，
    // 如果把 logger 放在第一个的话你就能打出所有的 action 了，
    // 比如 redux-thunk 的 actionCreator，打印的数量肯定比放在最后一个多，
    // 因为并不是所有的 action 都能走到最后（最右边的中间件『捣乱』，不执行 next(action)，所以后面的 log 也不会执行），也有新的 action 在 middleware 在中间被派发。
    const middlewaresChain = middlewares.map((middleware) => middleware(midProps));

    // 加强 dispatch
    dispatch = compose(...middlewaresChain)(dispatch);

    return { ...store, dispatch };
  };
}

// 聚合函数
// compose(f1, f2, f3, ...)(dispatch)
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
