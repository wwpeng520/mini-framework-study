function* gen() {
  try {
    let a = yield 1;
    console.log('a: ', a);
    let b = yield 2;
    console.log('b: ', b);
    let c = yield 3;
    console.log('c: ', c);
    return 4;
  } catch (e) {
    console.log('gen error: ', e);
  }
}

let iterator = gen();
let v1 = iterator.next(); // {value: 1, done: false}
console.log('iterator 1', v1);

let v2 = iterator.next('a value'); // {value: 2, done: false}
console.log('iterator 2', v2);

let v3 = iterator.next('b value'); // {value: 3, done: false}
// let v3 = iterator.throw('3 error');
// let v3 = iterator.return(); // 直接结束本迭代器，redux-saga 取消任务时候用到
console.log('iterator 3', v3);

let v4 = iterator.next('c value'); // {value: undefined, done: true}
console.log('iterator 4', v4);
