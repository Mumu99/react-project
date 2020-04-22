import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'

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
export default class Category extends Component {
  render() {
    return (
      <Card
        extra={
          <Button type='primary'>
            <PlusCircleFilled />
            添加
          </Button>
        }
      >
        表格
      </Card>
    )
  }
}
