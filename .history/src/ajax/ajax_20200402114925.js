import axios from 'axios'; // 发送请求
import qs from 'querystring'; // 用于转换为urllencodeed
import { message as msg } from 'antd'; // 错误弹窗
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { AJAX_TIMEOUT, AJAX_BASE_URL } from '../config'
import store from '../redux/store'
import { createDeleteUserAction } from '../redux/actions/login'
import { createSaveTitleAction } from '../redux/actions/title'

axios.defaults.timeout = AJAX_TIMEOUT // 超过两秒就是请求失败
axios.defaults.baseUrl = AJAX_BASE_URL // 设置默认请求地址

// 设置请求拦截器, 处理post请求参数的json编码问题
axios.interceptors.request.use(config => {
  NProgress.start();// 进度条开始
  // config 是包含本次请求的所有配置项, (请求地址, 请求参数, 请求方式等等)
  const { method, data } = config // 获取请求方式和请求的参数
  // 判断, 如果发送的是post请求并且, 你携带的还是json编码的数据, 就需要将json编码的数据改为urlencoded编码
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data)
    /*
      JSON.stringify 是用于将一个对象转为JSON字符串
      qs.stringify 是用于将一个对象转为urllencoded编码的字符串
    */
  }
  // 携带token
  const { token } = store.getState().userInfo
  if (token) config.headers.Authorization = 'atguigu_' + token
  return config
})

//#region  响应拦截器
// 设置响应拦截器, 处理请求的错误信息
axios.interceptors.response.use(
  // 响应成功的回调 -- 状态响应是2开头
  response => {
    NProgress.done()//进度条完毕
    return response.data;
  },
  // 响应失败的回调 --1. 服务器返回的状态码非2开头、2. 服务器根本没有任何响应
  err => {
    NProgress.done();//进度条完毕
    let errmsg = '未知错误, 请联系网站管理员!'
    if (err.message.indexOf('401') !== -1) errmsg = '身份验证失败, 请重新输入!'; else if (err.message.indexOf('404') !== -1) {
      // 通知redux删除该用户的所有信息, 从而触发当前页面的判断, 从而就会跳转到login
      store.dispatch({})
      errmsg = '404~~, 网站走丢了';
    }
    else if (err.message.indexOf('Network Error') !== -1) errmsg = '无网络请检查您的网络!';
    else if (err.message.indexOf('timeout') !== -1) errmsg = '您的网络不稳定, 连接超时!';
    msg.error(errmsg, 1)
    return new Promise(() => { })// 返回的promise的值为pendding
  }
)
//#endregion
export default axios