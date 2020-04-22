import React, { Component, Fragment } from 'react';
import { Card, Button, Select } from 'antd';
const { Option } = Select
export default class Product extends Component {
  render() {
    return (
      <Fragment>
        <Card
          title={
            <Fragment>
              <Select>
                <Option></Option>
              </Select>
            </Fragment>
          }
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
