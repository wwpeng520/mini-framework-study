import { useContext } from 'react';
import LifeCycle from './LifeCycle';
import RouterContext from './RouterContext';

export default function Prompt({ when = true, message }) {
  const { history } = useContext(RouterContext);
  if (!when) {
    return null;
  }
  return (
    <LifeCycle
      onMount={(self) => {
        self.release = history.block(message);
      }}
      onUnmount={(self) => {
        self.release();
      }}
    />
  );
}
