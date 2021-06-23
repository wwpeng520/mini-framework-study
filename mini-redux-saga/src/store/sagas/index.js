// import { put, take, all } from 'redux-saga/effects';
import { put, take, all } from '../../lib/m-redux-saga/effects';

import { COUNT_INCREASE_SAGA, COUNT_INCREASE, COUNT_ADD_SAGA, COUNT_ADD } from '../constants';
import loginSaga from './login';

/**
 * 在 saga 里面有三种 generator(saga)
 * 1. 根 saga：入口
 * 2. watcher saga：监听者
 * 3. work saga：执行者、工作者
 *
 * effects 指令对象：告诉监听 saga 需要做什么
 * take 接收（返回 action）
 * put 发送（dispatch）
 */
// 调用异步 call fork
// 修改状态 put，背后就是dispatch
// 做监听 take

// 整合所有的 saga
export default function* rootSaga() {
  yield all([
    loginSaga(),
    countIncreaseSaga(),
    countAddSaga(),
    // ... other sagas
  ]);
}

function* countIncreaseSaga() {
  // * 一直处于监听状态
  // yield takeEvery(LOGIN_SAGA, loginHandle);
  // takeEvery(封装 take 和 fork 来实现的), takeLatest, takeLeading, throttle
  // * OR
  while (true) {
    console.log(`%c等待${COUNT_INCREASE_SAGA}动作`, 'color: green;');
    // 我在要卡住了，我要等有人向我发出一个ASYNC_ADD的动作指令,我才会接着往下走
    const action = yield take(COUNT_INCREASE_SAGA);
    // 返回 action:{ type: COUNT_INCREASE_SAGA }
    console.log(`等到了`, action);
    yield put({ type: COUNT_INCREASE }); // store.dispatch({type:actionTypes.ADD});
    console.log(`继续入下执行`);
  }
}

function* countAddSaga() {
  for (let i = 0; i < 3; i++) {
    console.log(`%c等待${COUNT_ADD_SAGA}动作`, 'color: green;');
    // 我在要卡住了，我要等有人向我发出一个ASYNC_ADD的动作指令,我才会接着往下走
    const action = yield take(COUNT_ADD_SAGA); // 返回 action:{ type: COUNT_ADD_SAGA, payload: num }
    console.log(`等到了`, action);
    yield put({ type: COUNT_ADD, payload: action.payload });
    console.log(`继续入下执行`);
  }
  console.log(`%c监听结束`, 'color: blue;');
}
