import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons'

export default class Category extends Component {
  render() {
    return (
      <Card
        extra={
          <Button type='primary'>
            <PlusCircleTwoTone />
            添加
          </Button>
        }
      >
        表格
      </Card>
    )
  }
}
