import React, { Component } from 'react';
import { Card, Button } from 'antd';

export default class Category extends Component {
  render() {
    return (
      <Card
        extra={<Button type='link'>More</Button>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    )
  }
}
