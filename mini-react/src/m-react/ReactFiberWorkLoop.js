import { isString, isFn } from './utils';
import { updateFragmentComponent, updateFunctionComponent, updateClassComponent, updateHostComponent } from './ReactFiberReconciler';

// 根节点(wip: work in progress 当前正在工作当中的)
let wipRoot = null;
// 将要更新的下一个 fiber 节点
let nextUnitOfWork = null;

// 处理更新
export function scheduleUpdateOnFiber(fiber) {
  wipRoot = fiber;
  wipRoot.sibling = null;

  nextUnitOfWork = wipRoot;
}

// 执行下一次更新
function performanceUnitOfWork(wip) {
  // 1.更新自己
  const { type } = wip;
  if (isFn(type)) {
    // 区分函数组件和类组件
    if (type.prototype.isReactComponent) {
      updateClassComponent(wip);
    } else {
      updateFunctionComponent(wip);
    }
  } else if (isString(type)) {
    // 原生标签
    updateHostComponent(wip);
  } else {
    // fragment
    updateFragmentComponent(wip);
  }

  // 2.返回下一个要更新的 fiber
  if (wip.child) {
    return wip.child;
  }
  let next = wip;
  while (next) {
    if (next.sibling) {
      return next.sibling;
    }
    next = next.return;
  }
  return null;
}

function workLoop(deadLine) {
  // 存在下一个需要更新的节点 && 浏览器有空闲时间(timeRemaining(): 当前帧还剩下多少时间)
  while (nextUnitOfWork && deadLine.timeRemaining() > 0) {
    nextUnitOfWork = performanceUnitOfWork(nextUnitOfWork);
  }

  // 执行完成，提交
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
}

// 提交
function commitRoot() {
  commitWorker(wipRoot.child);
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }
  const { stateNode } = fiber;

  // 父dom节点
  // 所有fiber都有dom节点吗 0
  let parentNode = getParentNode(fiber); // fiber.return.stateNode;
  // 1.提交自己
  if (stateNode) {
    parentNode.appendChild(stateNode);
  }

  // 2.提交孩子
  commitWorker(fiber.child);
  // 3.提交下一个兄弟
  commitWorker(fiber.sibling);
}

// 找父节点
function getParentNode(fiber) {
  let next = fiber.return;
  while (!next.stateNode) {
    next = next.return;
  }

  return next.stateNode;
}

// window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应
requestIdleCallback(workLoop);
