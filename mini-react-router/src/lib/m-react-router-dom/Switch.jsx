import React, { useContext } from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

// Switch 独占路由：返回第一个匹配的 Route 或者 Redirect
export default function Switch({ children }) {
  const { location, match: contextMatch } = useContext(RouterContext);
  let match;
  let element; // 记录匹配的元素: Router OR Redirect
  React.Children.forEach(children, (child) => {
    if (match == null && React.isValidElement(child)) {
      // 前面还没有匹配上，并且 child 是有效元素
      element = child;
      match = child.props.path ? matchPath(location.pathname, child.props) : contextMatch;
    }
  });
  return match ? React.cloneElement(element, { computedMatch: match }) : null;
}
