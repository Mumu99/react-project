import React, { Component, Fragment } from 'react';
import { Card, Button, Select, Input } from 'antd';
const { Option } = Select
export default class Product extends Component {
  render() {
    return (
      <Fragment>
        <Card
          title={
            <div>
              <Select defaultValue='name'>
                <Option value='name'>按名称搜索</Option>
                <Option value='desc'>按描述搜索</Option>
              </Select>
              <Input style={{ width: '15%' }} />
            </div>
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
