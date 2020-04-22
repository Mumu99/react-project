import React, { Component } from 'react'
import { Card, Button, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
export default class Role extends Component {
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
      },
      {
        title: '授权时间',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '授权人',
        dataIndex: 'auth_time',
        key: 'auth_time',
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      }
    ];
    return (
      <div>
        <Card
          title={
            <Button type='primary'>
              <PlusCircleFilled />添加角色
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey='_id'
          />
        </Card>
      </div>
    )
  }
}
