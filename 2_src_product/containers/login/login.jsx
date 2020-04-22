import React, { Component, Fragment } from 'react'
import { Form, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../ajax';
import { connect } from 'react-redux'
import { createSaveUserAction } from '../../redux/actions/login'

import login from '../../static/images/logo.png';
import './css/login.less'
const { Item } = Form;

class Login extends Component {
  onFinish = async values => {
    let result = await reqLogin(values)
    let { status, data, msg } = result
    if (status === 0) { // 如果登录是成功的(用户名和密码是对的)
      this.props.saveUserInfo(data)
      message.success('登录成功!');
    } else {
      message.error(msg)
    }
    // console.log(user, token);
  };

  // 密码的验证
  pwdVal = (rule, value = '') => {
    const errmsg = []
    if (!value.trim()) errmsg.push('密码不能为空!!!')
    if (value.length < 4) errmsg.push('密码的长度必须大于等于6位')
    if (value.length > 12) errmsg.push('密码的长度不能超过12位')
    if (!(/^\w+$/).test(value)) errmsg.push('密码必须是字母、数字或下划线组成')
    if (errmsg.length > 0) return Promise.reject(errmsg)
    else return Promise.resolve()
  }
  render() {

    // 判断isLogin是true还是false
    if (this.props.isLogin) return <Redirect to='/admin' />

    /*
			用户名/密码的的合法性要求
				1). 必须输入
				2). 必须大于等于4位
				3). 必须小于等于12位
				4). 必须是字母、数字或下划线组成
		*/
    return (
      <Fragment>
        <div id="login">
          <header>
            <img src={login} alt="" />
            <h1>商品后台管理系统</h1>
          </header>
          <div className="login-content">
            <h1>用户登录</h1>
            <Form
              className="login-form"
              onFinish={this.onFinish}
            >
              <Item
                name="username"
                rules={[
                  { required: true, message: '用户名不能为空' },
                  { max: 12, message: '用户名必须不能大于12位' },
                  { min: 2, message: '用户名必须大于或等于2位' },
                  { pattern: /^\w+$/, message: '非法用户名, 请重新输入' }
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />

              </Item>
              <Item
                name="password"
                rules={[
                  { validator: this.pwdVal }
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Item>
              <Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
              </Button>
              </Item>
            </Form>
          </div>
        </div>
      </Fragment >
    )
  }
}

export default connect(
  state => ({ isLogin: state.userInfo.isLogin }),// 传递状态
  {
    saveUserInfo: createSaveUserAction // 传递操作状态的方法
  }
)(Login)
