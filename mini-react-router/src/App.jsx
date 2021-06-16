import { Component, useState } from 'react';
// import {
//   BrowserRouter as Router,
//   HashRouter as Router,
//   MemoryRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect,
//   useHistory,
//   useLocation,
//   useRouteMatch,
//   useParams,
//   withRouter,
//   Prompt,
// } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  withRouter,
  Redirect,
  Prompt,
} from './lib/m-react-router-dom';

import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import _404Page from './pages/_404Page';

function App() {
  const [state, setState] = useState(1);
  return (
    <div className='App'>
      <button onClick={() => setState(state + 1)}>{state}</button>
      {state < 5 && (
        <Router>
          <Link to='/'>首页</Link>
          <Link to='/user'>用户中心</Link>
          <Link to='/login'>登录</Link>
          <Link to='/product/abc'>商品</Link>

          {/*Switch 独占路由：返回第一个匹配的 Route 或者 Redirect */}
          <Switch>
            {/* <Redirect to='/' /> */}
            <Route
              path='/'
              exact
              // children={children}
              component={HomePage}
              // render={render}
            ></Route>
            <Route path='/user' component={UserPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/product/:id' render={() => <Product />} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;

// function Product() {
//   const { params = {}, url } = useRouteMatch() || {};
//   const { id } = params;
//   return (
//     <div>
//       <h1>Search-{id}</h1>
//       <Link to={url + '/detail'}>详情</Link>
//       <Route path={url + '/detail'} component={Detail} />
//     </div>
//   );
// }

@withRouter
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { confirm: true };
  }
  render() {
    console.log('Product props: ', this.props);
    return (
      <div>
        <h3>Product</h3>
        <Link to='/'>go home</Link>
        <Prompt
          when={this.state.confirm}
          message='你确定要离开嘛?'
          // message={(location) => {
          //   return '你确定要离开嘛?';
          // }}
        />
      </div>
    );
  }
}

function Detail({ match }) {
  return (
    <div>
      <h1>detail</h1>
    </div>
  );
}

// children  > component > render
function children(props) {
  console.log('children props', props);

  return <div>children</div>;
}

function render(props) {
  console.log('render props', props);
  return <div>render</div>;
}
