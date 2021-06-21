import { useContext, useReducer, useCallback, useLayoutEffect } from 'react';
import Context from './context';
import { hasStateChanged } from './uitls';

// 返回 dispatch
export function useDispatch() {
  const store = useContext(Context);
  return store.dispatch;
}

// 返回状态
// 用法：const { userDetail } = useSelector(({ user }) => ({ userDetail: user.userDetail }));
export function useSelector(selctor) {
  const store = useContext(Context);
  const selectedState = selctor(store.getState());
  const oriData = selctor ? selctor(store.getState()) : { state: store.getState() };

  const forceUpdate = useForceUpdate();

  // 更新组件：useEffect 有延迟, 可能导致未订阅(subscribe)
  // useLayoutEffect(() => {
  //   store.subscribe(() => {
  //     forceUpdate();
  //   });
  // }, [store, forceUpdate]);
  useLayoutEffect(() => {
    const unlistener = store.subscribe(() => {
      const newData = selctor ? selctor(store.getState()) : { state: store.getState() };
      if (hasStateChanged(oriData, newData)) {
        forceUpdate();
      }
    });
    // 取消订阅，否则活出现重复订阅
    return unlistener;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selctor]);

  return selectedState;
}

// 强制更新 forceUpdate
export function useForceUpdate() {
  // const [, forceUpdate] = useState(0);
  // const [, forceUpdate] = useState({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // 使用 useCallback 记录，update 不会变化
  const update = useCallback(() => {
    // forceUpdate((prev) => prev + 1);
    // forceUpdate({});
    forceUpdate();
  }, []);

  return update;
}
