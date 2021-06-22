import { isString } from './utils';

function render(vnode, container) {
  console.log('render vnode: ', vnode);
  // 1.根据 vnode 创建 node
  const node = createNode(vnode);

  // 2.把创建的 node 追加到 container 上
  container.appendChild(node);
}

// vnode => node
function createNode(vnode) {
  const { type, props } = vnode;
  let node;

  if (isString(type)) {
    // 原生标签
    node = document.createElement(type);
    reconcileChildren(node, props.children);
    // 把 vnode 上节点的属性添加到 node 上
    updateNode(node, props);
  } else if (typeof type === 'function') {
    // 区分函数组件和类组件
    node = type.prototype.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode);
  } else {
    node = document.createTextNode(vnode);
  }
  return node;
}

// 类组件
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  // 先new，再执行实例的 render（返回 vnode）
  const instance = new type(props);
  const child = instance.render();

  // 把 vnode 转换成 node
  const node = createNode(child);
  return node;
}

// 函数组件
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;

  // 执行函数生成节点：生成的是 vnode
  const child = type(props);

  // 把 vnode 转换成 node
  const node = createNode(child);
  return node;
}

// 把 vnode 上节点的属性添加到 node 上
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== 'children')
    .forEach((k) => {
      node[k] = nextVal[k];
    });
}

function reconcileChildren(pNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i];
    // vnode => node，然后插入到 container 中
    render(child, pNode);
  }
}

const ReactDOM = {};
ReactDOM.render = render;

export default ReactDOM;
