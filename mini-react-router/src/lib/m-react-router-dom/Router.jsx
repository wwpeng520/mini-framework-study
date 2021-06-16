import { Component } from 'react';
import RouterContext from './RouterContext';

// 供 BrowserRouter HashRouter MemoryRouter 使用
export default class Router extends Component {
  static computeRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
  }

  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location) => {
      this.setState({ location });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children, history } = this.props;
    const { location } = this.state;
    return (
      <RouterContext.Provider
        value={{
          history,
          location,
          match: Router.computeRootMatch(location.pathname),
        }}
      >
        {children}
      </RouterContext.Provider>
    );
  }
}
