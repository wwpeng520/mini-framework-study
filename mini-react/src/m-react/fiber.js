export function createFiber(vnode, returnFiber) {
  const { type, key, props } = vnode || {};
  const fiber = {
    type,
    key,
    props,
    // 用于记录当前 Fiber 所对应的真实 DOM 节点，或者当前虚拟组件的实例
    stateNode: null,
    child: null, // 第一个子 fiber
    sibling: null, // 下一个兄弟 fiber
    return: returnFiber,
  };

  return fiber;
}
