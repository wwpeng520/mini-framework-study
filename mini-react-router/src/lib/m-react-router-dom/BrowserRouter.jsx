import { Component } from 'react';
import { createBrowserHistory } from 'history';
import Router from './Router';

// history API 的作用：它可以在页面不跳转的情况下，直接修改地址栏
export default class BrowserRouter extends Component {
  constructor(props) {
    super(props);

    this.history = createBrowserHistory();
  }

  render() {
    const { children } = this.props;
    return <Router children={children} history={this.history} />;
  }
}
