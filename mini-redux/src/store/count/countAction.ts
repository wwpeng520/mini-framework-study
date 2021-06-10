import { COUNT_ADD, COUNT_MINUS, COUNT_INCREASE, COUNT_DECREASE } from './countConsts';

export function countIncrease() {
  return {
    type: COUNT_INCREASE,
  };
}

export function countDecrease() {
  return {
    type: COUNT_DECREASE,
  };
}

export function countAdd(count: number) {
  return {
    type: COUNT_ADD,
    payload: count,
  };
}

export function countMinus(count: number) {
  return {
    type: COUNT_MINUS,
    payload: count,
  };
}
