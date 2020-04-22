import React, { Component } from 'react'
import { Card, Button, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
import { reqUserList } from '../../../ajax'

export default class User extends Component {
  getUserList = async () => {
    let result = await reqUserList()
    console.log(result);
    // const { status, data, msg } = result
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
          <div>
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
