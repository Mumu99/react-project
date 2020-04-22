import React, { Component } from 'react'
import { Button, Card } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'

export default class Detail extends Component {
  render() {
    return (
      <div>
        <Card
          title={
            <div>
              <Button type='link'>
                <SwapLeftOutlined style={{ fontSize: 24 }} />返回
              </Button>
              <span>商品详情</span>
            </div>
          }
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>

      </div>
    )
  }
}
