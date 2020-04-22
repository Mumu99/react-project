import React, { Component, Fragment } from 'react'
import { Card, Button, Table, message, Modal, Form, Input, Tree } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs'
import { reqRoleList, reqRoleAdd, reqRoleAuth } from '../../../ajax'
import { PAGE_SIZE } from '../../../config'
import menus from '../../../config/tree_config'

const { Item } = Form
export default class Role extends Component {

  state = {
    roleList: [],//角色列表
    visible: false,// 是否展示新增角色弹窗
    visibleAuth: false, // 是否展示权限的弹窗
    checkedKeys: [],// 树形菜单中用户勾选的菜单
  }

  // 获取角色列表
  getRoleList = async () => {
    let result = await reqRoleList()
    const { status, data, msg } = result

    if (status === 0) this.setState({ roleList: data })
    else message.error(msg)
  }

  //#region 新增角色的逻辑
  // 展示新增角色的弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 新增角色弹窗- 确认按钮的回调
  handleOk = async () => {
    const { roleName } = this.refs.roleForm.getFieldsValue();
    let result = await reqRoleAdd(roleName);
    const { status, msg } = result
    if (status === 0) {
      this.getRoleList()
      this.refs.roleForm.resetFields();
      this.setState({ visible: false, });
    } else {
      message.error(msg)
    }
  };

  // 新增角色弹窗- 取消按钮的回调
  handleCancel = () => {
    this.refs.roleForm.resetFields();
    this.setState({ visible: false, });
  };
  //#endregion

  //#region 新增权限的逻辑
  // 新增权限弹窗- 确定按钮的回调
  handleAuthOk = async () => {
    let result = await reqRoleAuth(this._id, this.state.checkedKeys)
    const { status, data, msg } = result
    if (status === 0) {
      message.success('授权成功')
      this.getRoleList()
      this.setState({ visibleAuth: false })
    } else {
      message.error(msg)
    }
  }

  // 新增权限窗口- 取消按钮的回调
  handleAuthCancel = () => {
    this.setState({ visibleAuth: false })
  }
  // 展示权限的弹窗
  showAuthModal = (RoleObj) => {
    const { _id, menus } = RoleObj
    this._id = _id
    if (menus.indexOf('home') === -1) menus.push('home')
    this.setState({ visibleAuth: true, checkedKeys: menus })
  }
  //#endregion

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys })
  };

  componentDidMount() {
    this.getRoleList()
  }
  render() {
    // 数据源
    const dataSource = [...this.state.roleList]

    //表格列的配置
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (create_time) => dayjs(create_time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render: (auth_time) => auth_time ? dayjs(auth_time).format('YYYY年 MM月DD日 HH:mm:ss') : '暂未授权'
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
        align: 'center',
        render: (auth_name) => auth_name ? auth_name : '暂未授权'
      },
      {
        title: '操作',
        // dataIndex: 'roleName',
        key: 'opera',
        align: 'center',
        render: (RoleObj) =>
          <Button
            type='link'
            onClick={() => { this.showAuthModal(RoleObj) }}>设置权限
          </Button>
      }
    ];
    return (
      <Fragment>
        {/* 卡片布局 */}
        <Card
          title={
            <Button
              type='primary'
              onClick={this.showModal}
            >
              <PlusCircleFilled />添加角色
            </Button>
          }
        >
          <Table
            dataSource={dataSource.reverse()}
            columns={columns}
            bordered
            rowKey='_id'
            pagination={{
              pageSize: PAGE_SIZE
            }}
          />
        </Card>
        {/* 新增角色弹窗 */}
        <Modal
          title="新增角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确定'
          cancelText='取消'
        >
          <Form ref='roleForm'>
            <Item
              name='roleName'
              label='角色名:'
              rules={[
                { required: true, message: '角色名必须输入' }
              ]}
            >
              <Input placeholder='请输入角色名' />
            </Item>
          </Form>
        </Modal>
        {/* 授权弹窗 */}
        <Modal
          title="设置权限"
          visible={this.state.visibleAuth}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText='确定'
          cancelText='取消'
        >
          <Tree
            checkable // 用于控制树形菜单中的每一项可以勾选
            onCheck={this.onCheck} // 勾选菜单的回调
            checkedKeys={this.state.checkedKeys} // 勾选了哪些菜单 
            treeData={menus} // 菜单的数据源(antd 会自动遍历生成)
            defaultExpandAll // 默认展开所有菜单
          />
        </Modal>
      </Fragment>
    )
  }
}
