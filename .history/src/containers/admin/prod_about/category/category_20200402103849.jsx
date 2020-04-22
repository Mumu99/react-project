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
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {
        key: '3',
        name: '猪妈妈',
        age: 18,
        address: '九江修水南桥金泰华庭',
      },
    ];
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '下',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
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
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    )
  }
}
