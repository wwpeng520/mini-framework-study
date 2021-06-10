export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let newState = {};
    let hasChanged = false;
    for (const key in reducers) {
      const reducer = reducers[key];
      newState[key] = reducer(state[key], action);
      hasChanged = hasChanged || newState[key] !== state[key];
    }

    hasChanged = hasChanged || Object.keys(newState).length !== Object.keys(state).length;
    return hasChanged ? newState : state;
  };
}
