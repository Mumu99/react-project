import React, { Component } from 'react'
import { Card, Button, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'

export default class User extends Component {
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
            <Button>修改</Button>
            <br />
            <Button>修改</Button>
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
