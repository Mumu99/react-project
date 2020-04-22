/*
  打工仔
*/
import { SAVE_USER_INFO, DELETE_USER_INFO } from '../action_types';
// 读取localStorage数据
let user;
let token = localStorage.getItem('token');
try {
  user = JSON.parse(localStorage.getItem('user'));
  // 如果local中没有user, 那么JSON.parse(LocalStorage.getItem('user'))返回的就是null
  if (user === null) user = {}
} catch (error) {
  // 如果解析的JSON字符串不合法
  user = {}
}
// 初始化状态
let initState = {
  user: user || {},
  token: token || '',
  isLogin: JSON.stringify(user) !== '{}' && token ? true : false
}
export default function (preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SAVE_USER_INFO:
      return { ...data, isLogin: true }
    case DELETE_USER_INFO:
      return { user: {}, token: '', isLogin: false }
    default:
      return preState;
  }
}