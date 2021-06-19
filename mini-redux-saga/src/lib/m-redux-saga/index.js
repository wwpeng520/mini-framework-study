/**
 * 1.redux-saga 其实也是一个发布订阅模式，管理事件的地方是 channel，两个重点API：take 和 put。
 * 2.take 是注册一个事件到 channel 上，当事件过来时触发回调，需要注意的是，这里的回调仅仅是迭代器的 next，并不是具体响应事件的函数。也就是说 take 的意思就是：我在等某某事件，这个事件来之前不许往下走，来了后就可以往下走了。
 * 3.put 是发出事件，他是使用 redux dispatch 发出事件的，也就是说 put 的事件会被 redux 和 redux-saga 同时响应。
 * 4.redux-saga 增强了 redux 的 dispatch 函数，在 dispatch 的同时会触发 channel.put，也就是让 redux-saga 也响应回调。
 * 5.我们调用的 effects 和真正实现功能的函数是分开的，表层调用的 effects 只会返回一个简单的对象，这个对象描述了当前任务，他是稳定的，所以基于 effects 的单元测试很好写。
 * 6.当拿到 effects 返回的对象后，我们再根据他的 type 去找对应的处理函数来进行处理。
 * 7.整个 redux-saga 都是基于 Generator 的，每往下走一步都需要手动调用 next，这样当他执行到中途的时候我们可以根据情况不再继续调用 next，这其实就相当于将当前任务 cancel 了。
 */
export { default } from './middleware';
