// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import promise from 'redux-promise';

// import countReducer from './count/countReducer';
// import countReducer2 from './count2/countReducer';

// const store = createStore(
//   // countReducer,
//   combineReducers({ count: countReducer, count2: countReducer2 }),
//   applyMiddleware(thunk, promise, logger)
// );

import { createStore, applyMiddleware, combineReducers } from '../lib/m-redux';
import { thunk, promise, logger } from './middlewares';
import countReducer from './count/countReducer';
import countReducer2 from './count2/countReducer';

const store = createStore(combineReducers({ count: countReducer, count2: countReducer2 }), applyMiddleware(thunk, promise, logger));

export default store;
