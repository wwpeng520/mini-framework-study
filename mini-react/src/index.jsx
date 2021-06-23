// import { Component } from 'react';
import { Component } from './m-react/Component';
import ReactDOM from './m-react/react-dom';
import './index.css';

function FunctionComp({ name }) {
  return <div>{name}</div>;
}

class ClassComp extends Component {
  render() {
    const { name } = this.props;
    return <div>{name}</div>;
  }
}

const App = (
  <div className='App'>
    <div className='text'>
      app
    </div>
    <FunctionComp name='Function Component' />
    <ClassComp name='Class Component' />
  </div>
);

ReactDOM.render(App, document.getElementById('root'));
