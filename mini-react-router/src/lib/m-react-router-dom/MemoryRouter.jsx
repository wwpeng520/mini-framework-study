import { Component } from 'react';
import { createMemoryHistory } from 'history';
import Router from './Router';

export default class MemoryRouter extends Component {
  constructor(props) {
    super(props);

    this.history = createMemoryHistory();
  }

  render() {
    const { children } = this.props;
    return <Router children={children} history={this.history} />;
  }
}
