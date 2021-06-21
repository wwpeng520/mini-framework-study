import { useContext, useLayoutEffect } from 'react';
import { bindActionCreators } from '../m-redux';
import Context from './context';
import { useForceUpdate, useDispatch, useSelector } from './hooks';
import { hasStateChanged } from './uitls';

export { useForceUpdate, useDispatch, useSelector };

export function Provider({ children, store }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// export const connect = (mapStateToProps, mapDispatchToProps) => (WrapperCmp) => (props) => {
//   return <WrappedComponent .../>
// }

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrapperCmp) => (props) => {
    // 接收跨层级传递下来的 store
    const store = useContext(Context);
    const oriData = mapStateToProps ? mapStateToProps(store.getState()) : { state: store.getState() };

    const stateProps = mapStateToProps(store.getState());

    const dispatchProps = { dispatch: store.dispatch };
    if (typeof mapDispatchToProps === 'function') {
      Object.assign(dispatchProps, mapDispatchToProps(store.dispatch));
    } else if (typeof mapDispatchToProps === 'object') {
      Object.assign(dispatchProps, bindActionCreators(mapDispatchToProps, store.dispatch));
    }
    const forceUpdate = useForceUpdate();

    // useEffect 有延迟, 可能导致未订阅(subscribe)
    // useLayoutEffect(() => {
    //   store.subscribe(() => {
    //     forceUpdate();
    //   });
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [store]);
    useLayoutEffect(() => {
      const unlistener = store.subscribe(() => {
        const newData = mapStateToProps ? mapStateToProps(store.getState()) : { state: store.getState() };
        if (hasStateChanged(oriData, newData)) {
          forceUpdate();
        }
      });
      // 取消订阅，否则活出现重复订阅
      return unlistener;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapStateToProps]);

    return <WrapperCmp {...props} {...stateProps} {...dispatchProps} />;
  };
};
