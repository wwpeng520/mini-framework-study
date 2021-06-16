import { Component, useCallback } from 'react';
import { connect, useSelector, useDispatch } from '../lib/m-react-redux';
// import { connect } from "react-redux";
// import { bindActionCreators } from '../lib/m-redux';
import { COUNT_ADD, COUNT_DECREASE, COUNT_INCREASE } from '../store/count/countConsts';
import { IStoreProps } from '../store/interface';

// hoc是个函数，接收组件作为参数，返回新的组件
@connect(
  // mapStateToProps 把 state map（映射）props上
  ({ count }: IStoreProps) => ({ count }),

  // mapDispatchToProps object | function
  // 方式一：传对象
  {
    increase: () => ({ type: COUNT_INCREASE }),
    decrease: () => ({ type: COUNT_DECREASE }),
  }
  // 方式二：传函数
  // (dispatch) => {
  //   let creators = {
  //     increase: () => ({type: "ADD"}),
  //     decrease: () => ({type: "MINUS"}),
  //   };
  //   creators = bindActionCreators(creators, dispatch);
  //   return {dispatch, ...creators};
  // }
)
class ReactReduxPage extends Component<any, any> {
  render() {
    const { count, dispatch, increase, decrease } = this.props;
    console.log('this.props: ', this.props);
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({ type: COUNT_ADD, payload: 100 })}>add 100</button>

        <button onClick={increase}>increase</button>
        <button onClick={decrease}>decrease</button>
      </div>
    );
  }
}

// function ReactReduxPage() {
//   const count = useSelector(({ count }: IStoreProps) => count);
//   const dispatch = useDispatch();

//   const add = useCallback(() => {
//     dispatch({ type: COUNT_ADD, payload: 100 });
//   }, [dispatch]);

//   return (
//     <div>
//       <h3>ReactReduxHookPage</h3>
//       <button onClick={add}>{count}</button>
//     </div>
//   );
// }

export default ReactReduxPage;
// connect(state => state)(ReactReduxPage);
