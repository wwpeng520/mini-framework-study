import { useContext, useLayoutEffect } from 'react';
import { bindActionCreators } from '../m-redux';
import Context from './context';
import { useForceUpdate, useDispatch, useSelector } from './hooks';

export { useForceUpdate, useDispatch, useSelector };

export function Provider({ children, store }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// export const connect = (mapStateToProps, mapDispatchToProps) => (WrapperCmp) => (props) => {
//   return <WrappedComponent .../>
// }

function hasChanged(oldState, newState) {
  for (const key in oldState) {
    if (oldState[key] !== newState[key]) {
      return true;
    }
  }
  return false;
}

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
      store.subscribe(() => {
        const newData = mapStateToProps ? mapStateToProps(store.getState()) : { state: store.getState() };
        if (hasChanged(oriData, newData)) {
          forceUpdate();
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapStateToProps]);

    return <WrapperCmp {...props} {...stateProps} {...dispatchProps} />;
  };
};
