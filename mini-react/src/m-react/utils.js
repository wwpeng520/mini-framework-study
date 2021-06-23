export function isString(str) {
  return typeof str === 'string';
}

export function isFn(fn) {
  return typeof fn === 'function';
}

// 更新属性：把 vnode 上的属性绑定到 node上
export function updateNode(node, nextVal) {
  Object.keys(nextVal).forEach((k) => {
    if (k === 'children') {
      if (isString(nextVal.children)) {
        node.textContent = nextVal.children;
      }
    } else {
      node[k] = nextVal[k];
    }
  });
}
