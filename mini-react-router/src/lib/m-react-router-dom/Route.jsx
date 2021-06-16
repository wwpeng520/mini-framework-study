import React, { useContext } from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

export default function Route(props) {
  const { children, path, component, render } = props;
  const context = useContext(RouterContext);
  const { location, match: contextMatch } = context;

  const match = path ? matchPath(location.pathname, props) : contextMatch;
  const routeProps = {
    ...context,
    match,
  };

  // * match: children > component > render > null
  // * no match: children(function) > null
  return (
    <RouterContext.Provider value={routeProps}>
      {match
        ? children
          ? typeof children === 'function'
            ? children(routeProps)
            : children
          : component
          ? React.createElement(component, routeProps)
          : render
          ? render(routeProps)
          : null
        : typeof children === 'function'
        ? children(routeProps)
        : null}
    </RouterContext.Provider>
  );
}
