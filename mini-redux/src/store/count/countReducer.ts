import { AnyAction } from 'redux';
import { COUNT_ADD, COUNT_MINUS, COUNT_INCREASE, COUNT_DECREASE } from './countConsts';

export default function countReducer(state = 0, action: AnyAction | any) {
  const count = typeof action.payload === 'number' ? action.payload : 0;
  switch (action.type) {
    case COUNT_INCREASE:
      return state + 1;
    case COUNT_DECREASE:
      return state - 1;
    case COUNT_ADD:
      return state + count;
    case COUNT_MINUS:
      return state - count;
    default:
      return state;
  }
}
