import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import LoginPage from '../pages/LoginPage';
import _404Page from '../pages/_404Page';
import RouterGuards from './RouterGuards';

export const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/user',
    component: UserPage,
    auth: RouterGuards,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    component: _404Page,
  },
];

export default function Routes(props) {
  return (
    <Router>
      <Link to='/'>首页</Link>
      <Link to='/user'>用户中心</Link>
      <Link to='/login'>登录</Link>

      <Switch>
        {/* <Route path='/' exact component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/user' component={UserPage} />
        <RouterGuards path='/user' component={UserPage} />
        <Route component={_404Page} /> */}

        {routes.map(({ auth: Auth, ...routeProps }, index) =>
          Auth ? <Auth key={routeProps.path + index} {...routeProps} /> : <Route key={routeProps.path + index} {...routeProps} />
        )}
      </Switch>
    </Router>
  );
}
