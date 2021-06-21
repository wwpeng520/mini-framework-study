export function hasStateChanged(oldState, newState) {
  for (const key in oldState) {
    if (oldState[key] !== newState[key]) {
      return true;
    }
  }
  return false;
}
