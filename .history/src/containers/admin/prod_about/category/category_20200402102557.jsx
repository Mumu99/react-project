import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

export default class Category extends Component {
  render() {
    return (
      <Card
        extra={
          <Button type='primary'>
            <PlusCircleOutlined />
            添加
          </Button>
        }
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    )
  }
}
