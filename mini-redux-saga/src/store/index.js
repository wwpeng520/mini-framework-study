import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';
import createSagaMiddleware from '../lib/m-redux-saga';

import loginReducer from './reducers/loginReducer';
import countReducer from './reducers/countReducer';
// import loginSaga from './sagas/login';
import rootSaga from './sagas';

// 创建一个 Redux middleware，并将 Sagas 连接到 Redux Store
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ user: loginReducer, count: countReducer }),
  applyMiddleware(
    // thunk,
    sagaMiddleware
  )
);

// 动态地运行 saga。只能用于在 applyMiddleware 阶段之后执行 Saga，真正运行我们写的 saga 的入口
// sagaMiddleware.run(loginSaga);
sagaMiddleware.run(rootSaga);

export default store;
