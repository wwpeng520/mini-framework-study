// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import promise from 'redux-promise';

// import countReducer from './count/countReducer';

// const store = createStore(
//   countReducer,
//   // combineReducers({ count: countReducer }),
//   applyMiddleware(
//     thunk, promise,
//     logger
//   )
// );

import { createStore, applyMiddleware } from '../lib/m-redux';
import countReducer from './count/countReducer';
import { thunk, promise, logger } from './middlewares';

const store = createStore(countReducer, applyMiddleware(thunk, promise, logger));

export default store;
