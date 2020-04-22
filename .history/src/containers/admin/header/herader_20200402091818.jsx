import React, { Component } from 'react'
import { Button, Modal } from 'antd';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import screenfull from 'screenfull';
import { connect } from 'react-redux';
import dayjs from 'dayjs'
import { reqWeatherDate } from '../../../ajax'

import { createDeleteUserAction } from '../../../redux/actions/login';
import './css/herader.less';
const { confirm } = Modal;
class Header extends Component {

  // 定义是否全屏状态
  state = {
    isFull: false,
    time: dayjs(Date.now()).format('YYYY年 MM月DD日 HH:mm:ss'),
    //当前时间
    weatherData: {//天气信息
      dayPictureUrl: '', //天气图片地址
      weather: '暴雪转大暴雪', //天气文字信息
      temperature: '-100°C' //温度
    }
  }

  screenFull = () => {
    screenfull.toggle()
  }

  signOut = () => {
    confirm({
      title: '您确定要退出登录嘛?',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.props.deleteUserInfo();
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getWeatherDate = async () => {
    let result = await reqWeatherDate();
    const { dayPictureUrl, weather, temperature } = result
    this.setState({ weatherData: { dayPictureUrl, weather, temperature } })
  }

  // 如果用户按下esc退出就要获取
  componentDidMount() {
    screenfull.onchange(() => {
      let { isFull } = this.state;
      this.setState({
        isFull: !isFull
      })
    })
    this.timer = setInterval(() => {
      this.setState({
        time: dayjs(Date.now()).format('YYYY年 MM月DD日 HH:mm:ss')
      })
    }, 1000);
    // 发送请求天气的信息
    // this.getWeatherDate();
  }
  render() {
    const { isFull, weatherData, time } = this.state
    return (
      <header className='header-wraper'>
        <div className="herader-top">
          <Button onClick={this.screenFull} className='header-btn'>
            {
              isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined className='btn-icon' />
            }
          </Button>
          <span>欢迎, {this.props.username}</span>
          <Button type='link' onClick={this.signOut}>退出登录</Button>
        </div>
        <div className="herader-bottom">
          <p>首页</p>
          <div>
            <span>{time}</span>
            <img src={weatherData.dayPictureUrl} alt="天气:" />
            <span>{weatherData.weather} 温度：{weatherData.temperature}</span>
          </div>
        </div>
      </header>
    )
  }
}

export default connect(
  (state) => ({
    username: state.userInfo.user.username,
    title: state.title
  }),
  {
    deleteUserInfo: createDeleteUserAction
  }
)(Header)