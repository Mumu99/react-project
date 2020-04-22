import React, { Component, Fragment } from 'react';
import { Card, Button } from 'antd';

export default class Product extends Component {
  render() {
    return (
      <Fragment>
        <Card
          title="Default size card"
          extra={<Button>More</Button>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Fragment>
    )
  }
}
