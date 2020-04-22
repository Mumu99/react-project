import React, { Component } from 'react'
import { Card, Button, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'

export default class User extends Component {
  render() {
    // 数据源
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];

    // 列的配置
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '电话',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '注册时间',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所属角色',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
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
