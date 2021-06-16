import { useContext, useLayoutEffect } from 'react';
import { bindActionCreators } from '../m-redux';
import Context from './context';
import { useForceUpdate, useDispatch, useSelector } from './hooks';

export { useForceUpdate, useDispatch, useSelector };

export function Provider({ children, store }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// @connect(
//   // mapStateToProps 把state map（映射） props上一份
//   ({count}) => ({count}),

//   // mapDispatchToProps object | function
//   {
//     add: () => ({type: "ADD"}),
//     minus: () => ({type: "MINUS"}),
//   }
//   // (dispatch) => {
//   //   let creators = {
//   //     add: () => ({type: "ADD"}),
//   //     minus: () => ({type: "MINUS"}),
//   //   };

//   //   creators = bindActionCreators(creators, dispatch);

//   //   return {dispatch, ...creators};
//   // }
// )

// export const connect = (mapStateToProps, mapDispatchToProps) => (WrapperCmp) => (props) => {
//   return <WrappedComponent .../>
// }
export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrapperCmp) => (props) => {
    // 接收跨层级传递下来的 store
    const store = useContext(Context);

    const stateProps = mapStateToProps(store.getState());

    const dispatchProps = { dispatch: store.dispatch };
    if (typeof mapDispatchToProps === 'function') {
      Object.assign(dispatchProps, mapDispatchToProps(store.dispatch));
    } else if (typeof mapDispatchToProps === 'object') {
      Object.assign(dispatchProps, bindActionCreators(mapDispatchToProps, store.dispatch));
    }
    const forceUpdate = useForceUpdate();

    // useEffect 有延迟, 可能导致未订阅(subscribe)
    useLayoutEffect(() => {
      store.subscribe(() => {
        forceUpdate();
      });
    }, [store, forceUpdate]);
    return <WrapperCmp {...props} {...stateProps} {...dispatchProps} />;
  };
};
