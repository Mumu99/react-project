import React, { Component } from 'react'
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './header/herader'
import LeftNav from './left_nav/leftNav'
import Home from '../../components/home/home';
import Category from './prod_about/category/category';
import Product from './prod_about/product/product';
import User from './user/user';
import Role from './role/role';
import Bar from './charts/bar/bar';
import Line from './charts/line/line';
import Pie from './charts/pie/pie';
import AddUpdate from './prod_about/add_update/add_update';

import './css/admin.less'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    // 判断isLogin是true还是false
    if (!this.props.isLogin) return <Redirect to='/login' />
    return (
      <Layout className='admin-wrap'>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content className='admin-content'>
            <Switch>
              <Route path='/admin/home' component={Home} />
              <Route path='/admin/prod_about/category' component={Category} />
              <Route path='/admin/prod_about/product' component={Product} />
              <Route path='/admin/prod_about/product/add_update' exact component={AddUpdate} />
              <Route path='/admin/user' component={User} />
              <Route path='/admin/role' component={Role} />
              <Route path='/admin/charts/bar' component={Bar} />
              <Route path='/admin/charts/line' component={Line} />
              <Route path='/admin/charts/pie' component={Pie} />
              <Redirect to='/admin/home' />
            </Switch>
          </Content>
          <Footer className='admin-footer'>
            推荐使用谷歌浏览器, 获取用户最佳体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default connect(
  (state) => ({
    isLogin: state.userInfo.isLogin
  }),
  {

  }
)(Admin)
