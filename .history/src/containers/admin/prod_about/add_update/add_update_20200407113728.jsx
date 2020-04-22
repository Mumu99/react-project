import React, { Component } from 'react'
import { Button, Card, Form, Input } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'

const { Item } = Form
export default class Add_update extends Component {
  render() {
    return (
      <div>
        <Card
          title={
            <div>
              <Button type='link' onClick={this.props.history.goBack}>
                <SwapLeftOutlined style={{ fontSize: 20 }} />返回
            </Button>
              <span>添加商品</span>
            </div>
          }
        >
          <Form>
            <Item
              name='productName'
              label='商品名称:'
              rules={[
                { required: true, message: '商品名称必填' }
              ]}
              labelCol={{ offset: 5 }}
            >
              <Input />
            </Item>
          </Form>
        </Card>
        <Button type='primary' onClick={() => { this.props.history.goBack() }}>回退</Button>
      </div>
    )
  }
}
