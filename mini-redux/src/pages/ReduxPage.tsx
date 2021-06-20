import React from 'react';
import store from '../store';
import { COUNT_ADD, COUNT_DECREASE, COUNT_INCREASE, COUNT_MINUS } from '../store/count/countConsts';
import { COUNT_ADD2 } from '../store/count2/countConsts';

export default class ReduxPage extends React.Component {
  unsubscribe: Function | undefined;

  componentDidMount() {
    // store 发生变化之后，执行 subscribe 的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  increase = () => {
    store.dispatch({ type: COUNT_INCREASE });
  };

  decrease = () => {
    store.dispatch({ type: COUNT_DECREASE });
  };

  add = () => {
    store.dispatch({ type: COUNT_ADD, payload: 10 });
  };

  add2 = () => {
    store.dispatch({ type: COUNT_ADD2, payload: 100 });
  };

  minus = () => {
    store.dispatch({ type: COUNT_MINUS, payload: 10 });
  };

  // dispatch(action) 
  // action:{type: 'ADD', payload: ...}
  // action 为函数
  asyncIncrease = () => {
    store.dispatch((dispatch: any, getState: any) => {
      console.log('get state0: ', getState());
      setTimeout(() => {
        dispatch({ type: COUNT_INCREASE });
        console.log('get state1: ', getState());
      }, 1000);
    });
  };

  asyncAdd = () => {
    store.dispatch((dispatch: any, getState: any) => {
      console.log('get state0: ', getState());
      setTimeout(() => {
        dispatch({ type: COUNT_ADD, payload: 10 });
        console.log('get state1: ', getState());
      }, 1000);
    });
  };

  // action 为 Promise 函数
  asyncPromise = () => {
    store.dispatch(Promise.resolve({ type: COUNT_INCREASE }));
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        {/* <p>{store.getState()}</p> */}
        <p>count: {store.getState().count}</p>
        <p>count2: {store.getState().count2.num}</p>
        <button onClick={this.increase}>increase</button>
        <button onClick={this.decrease}>decrease</button>
        <button onClick={this.add}>add 10</button>
        <button onClick={this.add2}>add2 100</button>
        <button onClick={this.minus}>minus 10</button>
        <br />
        <br />
        <button onClick={this.asyncIncrease}>asyncIncrease</button>
        <button onClick={this.asyncAdd}>asyncAdd 10</button>
        <button onClick={this.asyncPromise}>asyncPromise</button>
      </div>
    );
  }
}
