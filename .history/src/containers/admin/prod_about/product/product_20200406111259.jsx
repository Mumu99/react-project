import React, { Component, Fragment } from 'react';
import { Card, Button, Select, Input } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons'
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

              <Input allowClear style={{ width: '25%', margin: '0 10px' }} placeholder='' />

              <Button type='primary'><SearchOutlined />搜索</Button>
            </div>
          }
          extra={<Button type="primary">
            <PlusCircleOutlined />添加分类
        </Button>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Fragment >
    )
  }
}
