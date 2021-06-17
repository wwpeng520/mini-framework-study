import { Route, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

export default function RouterGuards({ component: Component, ...rest }) {
  const { isLogin } = useSelector(({ user }) => ({ isLogin: user.isLogin }));
  console.log('isLogin: ', isLogin);
  return (
    <Route
      {...rest}
      render={(props) => (isLogin ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />)}
    />
  );
}
// export default connect(({ user }) => ({ isLogin: user.isLogin }))(RouterGuards);
