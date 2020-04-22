import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'

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
