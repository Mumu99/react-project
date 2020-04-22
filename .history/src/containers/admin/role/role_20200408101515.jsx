import React, { Component } from 'react'
import { Card, Button } from 'antd';
export default class Role extends Component {
  render() {
    return (
      <div>
        <Card
          title={
            <Button type='primary'>
              添加角色
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
