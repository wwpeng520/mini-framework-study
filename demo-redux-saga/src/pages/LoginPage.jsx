import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../store/actions/user';

@connect(({ user }) => ({ isLogin: user.isLogin, err: user.err, loading: user.loading }), { login })
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  nameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { isLogin, location, login, err, loading } = this.props;
    const { name } = this.state;

    if (isLogin) {
      const { from = '/' } = location.state || {};
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h3>Login Page</h3>
        <input type='text' value={name} onChange={this.nameChange} />
        <p className='red'>{err.msg}</p>
        <button onClick={() => login({ name })}>{loading ? 'loading...' : 'login'}</button>
      </div>
    );
  }
}
export default LoginPage;
