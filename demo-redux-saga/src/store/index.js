import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { loginReducer } from './loginReducer';
import loginSaga from './actions/loginSaga';

const sagaMiddleware = createSagaMiddleware(); // 创建一个 Redux middleware，并将 Sagas 连接到 Redux Store

const store = createStore(
  combineReducers({ user: loginReducer }),
  applyMiddleware(
    // thunk,
    sagaMiddleware
  )
);

sagaMiddleware.run(loginSaga); // 动态地运行 saga。只能用于在 applyMiddleware 阶段之后执行 Saga

export default store;
