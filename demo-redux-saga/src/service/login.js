// 模拟登录接口
const LoginService = {
  login(userInfo = {}) {
    console.log('login userInfo: ', userInfo);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.name === 'wwp') {
          resolve({ id: 1, name: '已经登录了...' });
        } else {
          reject({ err: { msg: '用户名或密码错误！' } });
        }
      }, 1000);
    });
  },
  // 获取更多信息
  getMoreUserInfo(userInfo = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.id === 1) {
          resolve({ ...userInfo, score: 66 });
        } else {
          reject({ msg: '获取详细信息错误！' });
        }
      }, 1000);
    });
  },
};
export default LoginService;
