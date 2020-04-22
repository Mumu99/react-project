import React, { Component, Fragment } from 'react'
import { Card, Button, Table, message, Modal, Form, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import { reqUserList } from '../../../ajax'

const { Item } = Form
export default class User extends Component {

  state = {
    users: [], // 用户的列表
    roles: [] //角色列表
  }
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
        <Card
          title={<Button type='primary'><PlusCircleFilled />创建用户</Button>}
        >
          <Table
            dataSource={dataSource.reverse()}
            columns={columns}
            bordered
            rowKey='_id'
          />
        </Card>

      </Fragment>
    )
  }
}
