import React, { Component } from 'react'
import { Button, Card } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'

export default class Detail extends Component {
  render() {
    return (
      <div>
        <Card
          title={<Button type='link'><SwapLeftOutlined />返回</Button>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>

      </div>
    )
  }
}
