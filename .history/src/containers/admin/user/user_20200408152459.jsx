import React, { Component } from 'react'
import { Card, Button, Table, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
import { reqUserList } from '../../../ajax'

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
  componentDidMount() {
    this.getUserList()
  }
  render() {
    // 数据源
    const dataSource = [];

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
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
      },
      {
        title: '操作',
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
      <div>
        <Card
          title={<Button type='primary'><PlusCircleFilled />创建用户</Button>}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
          />;
        </Card>
      </div>
    )
  }
}
