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
              wrapperCol={{ span: 10 }}
            >
              <Input placeholder='输入商品名' />
            </Item>
            <Item
              name='productDesc'
              label='商品描述:'
              rules={[
                { required: true, message: '商品描述必填' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Input placeholder='输入商品描述信息' />
            </Item>
            <Item
              name='productPrice'
              label='商品价格:'
              rules={[
                { required: true, message: '商品价格必填' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Input prefix="￥" suffix="圆" placeholder='输入商品价格' />
            </Item>
          </Form>
        </Card>
        <Button type='primary' onClick={() => { this.props.history.goBack() }}>回退</Button>
      </div>
    )
  }
}
