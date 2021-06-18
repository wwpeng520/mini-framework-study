import { COUNT_ADD, COUNT_MINUS, COUNT_INCREASE, COUNT_DECREASE } from './constants';

export default function countReducer(state = { num: 0 }, action) {
  const count = typeof action.payload === 'number' ? action.payload : 0;
  switch (action.type) {
    case COUNT_INCREASE:
      return { ...state, num: state.num + 1 };
    case COUNT_DECREASE:
      return { ...state, num: state.num - 1 };
    case COUNT_ADD:
      return { ...state, num: state.num + count };
    case COUNT_MINUS:
      return { ...state, num: state.num + count };
    default:
      return state;
  }
}
