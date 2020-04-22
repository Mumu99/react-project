import React, { Component } from 'react'
import { Card, Button } from 'antd';

export default class User extends Component {
  render() {
    return (
      <div>
        <Card
          title={<Button type='link'></Button>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>F
      </div>
    )
  }
}
