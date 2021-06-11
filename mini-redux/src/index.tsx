import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 引入 mini-react-redux
import store from './store';
import { Provider } from './lib/m-react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
