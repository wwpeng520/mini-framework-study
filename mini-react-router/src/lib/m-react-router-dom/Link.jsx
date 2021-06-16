import { useContext } from 'react';
import RouterContext from './RouterContext';

export default function Link({ children, to }) {
  const { history } = useContext(RouterContext);

  const handleClick = (e) => {
    e.preventDefault();
    history.push(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
