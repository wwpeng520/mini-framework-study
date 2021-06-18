import { COUNT_ADD, COUNT_ADD_SAGA, COUNT_MINUS, COUNT_INCREASE, COUNT_INCREASE_SAGA, COUNT_DECREASE } from '../constants';

export const add = (num) => ({ type: COUNT_ADD, payload: num });
export const addSaga = (num) => ({ type: COUNT_ADD_SAGA, payload: num });
export const minus = (num) => ({ type: COUNT_MINUS, payload: num });
export const increase = () => ({ type: COUNT_INCREASE });
export const increaseSaga = () => ({ type: COUNT_INCREASE_SAGA });
export const decrease = () => ({ type: COUNT_DECREASE });

// const countActions = {
//   add: (num) => ({ type: COUNT_ADD, payload: num }),
//   minus: (num) => ({ type: COUNT_MINUS, payload: num }),
// };

// export default countActions;
