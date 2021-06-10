import { AnyAction } from 'redux';
import { COUNT_ADD2, COUNT_MINUS2, COUNT_INCREASE2, COUNT_DECREASE2 } from './countConsts';

export default function countReducer2(state = { num: 0 }, action: AnyAction | any) {
  const count = typeof action.payload === 'number' ? action.payload : 0;
  switch (action.type) {
    case COUNT_INCREASE2:
      return { ...state, num: state.num + 1 };
    case COUNT_DECREASE2:
      return { ...state, num: state.num - 1 };
    case COUNT_ADD2:
      return { ...state, num: state.num + count };
    case COUNT_MINUS2:
      return { ...state, num: state.num + count };
    default:
      return state;
  }
}
