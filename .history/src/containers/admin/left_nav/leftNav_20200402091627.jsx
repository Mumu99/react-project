import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSaveTitleAction } from '../../../redux/actions/title'

import menus from '../../../config/menu_config'
import logo from '../../../static/images/logo.png';
import './css/leftNav.less'

const { SubMenu, Item } = Menu;

class LeftNav extends Component {

  // 根据菜单配置文件生成菜单
  createMenu = (menuArr) => {
    return menuArr.map((menuObj) => {
      if (!menuObj.children) {
        return (
          <Item onClick={() => { console.log(menuObj.title) }} key={menuObj.key}>
            <Link to={menuObj.path}>
              <menuObj.icon />
              <span>{menuObj.title}</span>
            </Link>
          </Item>
        )
      } else {
        return (
          <SubMenu
            key={menuObj.key}
            title={
              <span>
                <menuObj.icon />
                <span>{menuObj.title}</span>
              </span>
            }
          >
            {this.createMenu(menuObj.children)}
          </SubMenu>
        )
      }
    })
  }
  render() {
    // const currentPath = this.props.location.pathname
    const currentPathArr = this.props.location.pathname.split('/');
    const selectedKey = currentPathArr.reverse()[0]
    // const x = currentPath.substring(currentPath.lastIndexOf("/")).substr(1)
    // console.log(x);
    return (
      <div>
        <header className='nav-top'>
          <img src={logo} alt="" />
          <h1>商品管理系统</h1>
        </header>
        <div>

          <Menu
            selectedKeys={[selectedKey]} // 默认选择键
            defaultOpenKeys={currentPathArr}  // 默认打开键
            mode="inline" //菜单类型，现在支持垂直、水平、和内嵌模式三种
            theme="dark"
          >
            {this.createMenu(menus)}

          </Menu>
        </div>
      </div>
    )
  }
}
// 可以加工组件, 能让非路由组件拥有路由组件的API
export default connect(
  () => ({}),
  {
    title: createSaveTitleAction
  }
)(withRouter(LeftNav))
