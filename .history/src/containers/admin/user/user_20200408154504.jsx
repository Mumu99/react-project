import React, { Component, Fragment } from 'react'
import { Card, Button, Table, message, Modal, Form, Input, Select } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import { reqUserList } from '../../../ajax'

const { Item } = Form
const { Option } = Select
export default class User extends Component {

  state = {
    users: [], // 用户的列表
    roles: [], //角色列表
    visible: false, //标识新增用户弹窗
  }

  showModal = () => {
    this.setState({ visible: true, });
  };

  handleOk = () => {
    this.setState({ visible: false, });
  };

  handleCancel = () => {
    this.setState({ visible: false, });
  };

  getUserList = async () => {
    let result = await reqUserList()
    const { status, data, msg } = result
    if (status === 0) {
      const { users, roles } = data
      this.setState({ users, roles })
    } else {
      message.error(msg)
    }
  }

  getRoleName = (id) => {
    let result = this.state.roles.find((roleObj) => {
      return roleObj._id === id
    })
    if (result) return result.name

  }

  componentDidMount() {
    this.getUserList()
  }
  render() {
    // 数据源
    const dataSource = [...this.state.users];

    // 列的配置
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (create_time) => dayjs(create_time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        width: '15%',
        render: (role_id) => this.getRoleName(role_id)
      },
      {
        title: '操作',
        align: 'center',
        // dataIndex: 'opera',
        key: 'opera',
        render: () => {
          return <div>
            <Button type='link'>修改</Button>
            <br />
            <Button type='link'>删除</Button>
          </div>
        }
      },
    ];
    return (
      <Fragment>
        {/* card布局 */}
        <Card
          title={<Button type='primary' onClick={this.showModal}><PlusCircleFilled />创建用户</Button>}
        >
          <Table
            dataSource={dataSource.reverse()}
            columns={columns}
            bordered
            rowKey='_id'
          />
        </Card>
        {/* Modal布局 */}
        <Modal
          title="新增用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确认'
          cancelText='取消'
        >
          <Form>
            <Item
              name='username'
              label='用户名'
              rules={[
                { required: true, message: '用户名必须输入' }
              ]}
            >
              <Input placeholder='请输入用户名' />
            </Item>
            <Item
              name='password'
              label='密码'
              rules={[
                { required: true, message: '密码必须输入' }
              ]}
            >
              <Input placeholder='请输入密码' />
            </Item>
            <Item
              name='phone'
              label='手机号'
              rules={[
                { required: true, message: '手机号必须输入' }
              ]}
            >
              <Input placeholder='请输入手机号' />
            </Item>
            <Item
              name='email'
              label='邮箱'
              rules={[
                { required: true, message: '邮箱必须输入' }
              ]}
            >
              <Input placeholder='请输入邮箱' />
            </Item>
            <Item
              name='role_id'
              label='角色'
              rules={[
                { required: true, message: '必须选择一个角色' }
              ]}
            >
              <Select defaultValue=''>
                <Option value=''>请选择角色</Option>
                {
                  this.state.roles.map(() => { })
                }
              </Select>
            </Item>
          </Form>
        </Modal>
      </Fragment>
    )
  }
}
