import React, { Component } from 'react';
import { Card, Button, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'


export default class Category extends Component {
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
        gender: '男'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
        gender: '男'
      },
      {
        key: '3',
        name: '猪妈妈',
        age: 18,
        address: '九江修水南桥金泰华庭',
        gender: '男'
      },
      {
        key: '3',
        name: '猪妈妈',
        age: 18,
        address: '九江修水南桥金泰华庭',
        gender: '男'
      },
      {
        key: '3',
        name: '猪妈妈',
        age: 18,
        address: '九江修水南桥金泰华庭',
        gender: '男'
      },
      {
        key: '3',
        name: '猪妈妈',
        age: 18,
        address: '九江修水南桥金泰华庭',
        gender: '男'
      },

    ];
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        align: 'center'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        align: 'center'
      },
    ];
    return (
      <Card
        extra={
          <Button type='primary'>
            <PlusCircleFilled />
            添加
          </Button>
        }
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered />;
      </Card>
    )
  }
}
