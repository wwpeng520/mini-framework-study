import { Component } from 'react';
import { createHashHistory } from 'history';
import Router from './Router';

// hash 路由： xxx.com/#/user
export default class HashRouter extends Component {
  constructor(props) {
    super(props);

    this.history = createHashHistory();
  }

  render() {
    const { children } = this.props;
    return <Router children={children} history={this.history} />;
  }
}
