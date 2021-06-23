import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop';

function render(vnode, container) {
  console.log('render vnode: ', vnode);

  // 根 fiber 节点
  const fiberRoot = {
    type: container.nodeName.toLocaleLowerCase(),
    // 用于记录当前 Fiber 所对应的真实 DOM 节点，或者当前虚拟组件的实例
    stateNode: container,
    props: { children: vnode },
  };

  // 更新
  scheduleUpdateOnFiber(fiberRoot);
}

const ReactDOM = {};
ReactDOM.render = render;

export default ReactDOM;
