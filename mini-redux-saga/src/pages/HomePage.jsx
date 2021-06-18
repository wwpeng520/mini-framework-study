import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increase, add, increaseSaga, addSaga } from '../store/actions/count';

class HomePage extends Component {
  render() {
    const { count, increase, add, increaseSaga, addSaga } = this.props;
    return (
      <div>
        <h3>HomePage</h3>
        <div>{count.num}</div>
        <button onClick={increase}>increase</button>
        <button onClick={increaseSaga}>increaseSaga</button>
        <button onClick={() => add(10)}>add 10</button>
        <button onClick={() => addSaga(10)}>addSaga 10</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ count: state.count });
const mapDispatchToProps = { increase, add, increaseSaga, addSaga };
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
