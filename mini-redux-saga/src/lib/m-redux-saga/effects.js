import * as effectTypes from './effectTypes';
import { IO } from './symbols';

const makeEffect = (type, payload) => ({ [IO]: IO, type, payload });

/**
 * @param {*} pattern - 动作类型：'LOGIN_SAGA'
 * @returns 返回：{ type: 'TAKE', payload: { pattern: 'LOGIN_SAGA' } }
 */
export function take(pattern) {
  return makeEffect(effectTypes.TAKE, { pattern });
}

/**
 * @param {*} action { type: 'LOGIN', payload: ... }
 * @returns 返回：{ type: 'PUT', payload: { action: { type: 'LOGIN', payload: ... } } }
 */
export function put(action) {
  return makeEffect(effectTypes.PUT, { action });
}

export function call(fn, ...args) {
  return makeEffect(effectTypes.CALL, { fn, args });
}

export function fork(fn, ...args) {
  return makeEffect(effectTypes.FORK, { fn, args });
}

export function all(effects) {
  return makeEffect(effectTypes.ALL, effects);
}
