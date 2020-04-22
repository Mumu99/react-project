import React, { Component } from 'react'
import { Card, Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'

export default class User extends Component {
  render() {
    return (
      <div>
        <Card
          title={<Button type='link'><PlusCircleFilled />创建用户</Button>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>F
      </div>
    )
  }
}
