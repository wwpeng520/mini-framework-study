import { createFiber } from './fiber';
import { isString, updateNode } from './utils';

export function updateHostComponent(wip) {
  // 初次渲染时没有 stateNode
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    // 更新属性
    updateNode(wip.stateNode, wip.props);
  }

  // 协调子节点
  reconcileChildren(wip, wip.props.children);
  console.log('wip: ', wip);
}

// 函数组件
export function updateFunctionComponent(wip) {
  const { type, props } = wip;
  // 函数组件 type 为 function，执行 return 回来的就是 children
  const children = type(props);
  reconcileChildren(wip, children);
}

// 类组件
export function updateClassComponent(wip, ) {
  const { type, props } = wip;
  // 先 new，再执行实例的 render（返回 children)
  const instance = new type(props);
  const children = instance.render();
  reconcileChildren(wip, children);
}

export function updateFragmentComponent(wip) {
  reconcileChildren(wip, wip.props.children);
}

// diff 协调子节点
function reconcileChildren(returnFiber, children) {
  if (isString(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];
  let previousNewFiber = null;
  for (let index = 0; index < newChildren.length; index++) {
    const newChild = newChildren[index];
    const newFiber = createFiber(newChild, returnFiber);

    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}
