import isPromise from 'is-promise';

export function thunk({ dispatch, getState }) {
  // store.dispatch((dispatch, getState) => {
  //   setTimeout(() => {
  //     dispatch({ type: COUNT_INCREASE });
  //   }, 1000);
  // });
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

export function logger({ dispatch, getState }) {
  return (next) => (action) => {
    console.log('%c--------------------- LOGGER START ---------------------', 'color:#0f0;');
    console.log('prev state', getState());
    console.log('执行 action: ', action);

    const returnValue = next(action);

    console.log('next state', getState());
    console.log('%c---------------------- LOGGER END ----------------------', 'color: orange;');
    return returnValue;
  };
}

export function promise({ dispatch, getState }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
