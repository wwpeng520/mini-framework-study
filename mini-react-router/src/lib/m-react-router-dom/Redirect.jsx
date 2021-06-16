import { useContext } from 'react';
import RouterContext from './RouterContext';
import LifeCycle from './LifeCycle';

// 重定向
export default function Redirect({ to, push = false }) {
  const { history } = useContext(RouterContext);

  return (
    <LifeCycle
      onMount={() => {
        push ? history.push(to) : history.replace(to);
      }}
    />
  );
}
