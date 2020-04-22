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
              <Select defaultValue='name'>
                <Option value='name'>按名称搜索</Option>
                <Option value='desc'>按描述搜索</Option>
              </Select>
            </Fragment>
          }
          extra={<Button type='primary' >More</Button>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Fragment>
    )
  }
}
