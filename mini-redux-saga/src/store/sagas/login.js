// * 最终目的： 通过 redux 的 store.dispatch 修改状态
// * redux-saga API 说明：https://redux-saga-in-chinese.js.org/docs/api/

// import { call, put, take, fork } from 'redux-saga/effects';
// import { call, put, take, fork } from '../../lib/m-redux-saga/effects';
import { call, put, take, fork } from '../../lib/m-redux-saga/effects';

import LoginService from '../../service/login';
import { LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST } from '../constants';

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

// watcher saga
function* loginSaga() {
  // takeEvery(pattern, saga, ...args): 在发起（dispatch）到 Store 并且匹配 pattern 的每一个 action 上派生一个 saga
  // yield takeEvery(LOGIN_SAGA, loginHandle);
  // takeEvery 是一个使用 take 和 fork 构建的高级 API。功能等价于以下代码
  while (true) {
    const action = yield take(LOGIN_SAGA); // 返回 action:{ type: LOGIN_SAGA, payload: info }
    // call 阻塞
    // fork 非阻塞
    yield fork(loginHandle, action);
    console.log('非阻塞');
  }
}

// worker saga
function* loginHandle(action) {
  yield put({ type: REQUEST });
  try {
    // 获取用户基本信息
    let res1 = yield call(LoginService.login, action.payload);
    // 获取用户更多信息
    let res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({ type: LOGIN_SUCCESS, payload: res2 });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, payload: err });
  }
}

// ajax.then(call)
// fork

export default loginSaga;
