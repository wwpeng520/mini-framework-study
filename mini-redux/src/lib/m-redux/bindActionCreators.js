// react-redux 中 connect 方法的 mapDispatchToProps 可以传 object | function
// 1. object:
// {
//   add: () => ({type: "ADD"}),
//   minus: () => ({type: "MINUS"}),
// }

// 2. function
// (dispatch) => {
//   let creators = {
//     add: () => ({type: "ADD"}),
//     minus: () => ({type: "MINUS"}),
//   };
//   creators = bindActionCreators(creators, dispatch);
//   return {dispatch, ...creators};
// }

export default function bindActionCreators(creators, dispatch) {
  let obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
