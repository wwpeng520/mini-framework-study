import { TAKE, PUT, CALL, FORK, ALL } from './effectTypes';
import { IO } from './symbols';

const makeEffect = (type, payload) => ({ [IO]: IO, type, payload });

export function take(pattern) {
  return makeEffect(TAKE, { pattern });
}

export function put(action) {
  return makeEffect(PUT, { action });
}

export function call(fn, ...args) {
  return makeEffect(CALL, { fn, args });
}

export function fork(fn, ...args) {
  return makeEffect(FORK, { fn, args });
}

export function all(effects) {
  return makeEffect(ALL, effects);
}
