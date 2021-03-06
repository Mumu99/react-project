import React, { Component } from 'react'
import { Button, Card } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'

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
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Button type='primary' onClick={() => { this.props.history.goBack() }}>回退</Button>
      </div>
    )
  }
}
