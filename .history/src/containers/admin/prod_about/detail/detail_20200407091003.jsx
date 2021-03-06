import React, { Component } from 'react'
import { Button, Card, List } from 'antd'
import { RotateLeftOutlined } from '@ant-design/icons'

const { Item } = List
export default class Detail extends Component {
  render() {
    return (
      <div>
        <Card
          title={
            <div>
              <Button type='link' onClick={this.props.history.goBack}>
                <RotateLeftOutlined style={{ fontSize: 20 }} />返回
                {/* <SwapLeftOutlined style={{ fontSize: 20 }} />返回 */}
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
