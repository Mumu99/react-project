import React, { Component } from 'react'
import { Card, Button, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
export default class Role extends Component {
  render() {
    return (
      <div>
        <Card
          title={
            <Button type='primary'>
              <PlusCircleFilled />添加角色
            </Button>
          }
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    )
  }
}
