import React, { Component } from 'react';
import { Card } from 'antd';

export default class Category extends Component {
  render() {
    return (
      <Card
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    )
  }
}