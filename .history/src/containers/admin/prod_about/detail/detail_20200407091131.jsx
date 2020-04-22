import React, { Component } from 'react'
import { Button, Card, List } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'

const { Item } = List
export default class Detail extends Component {
  render() {
    return (
      <div>
        <Card
          title={
            <div>
              <Button type='link' onClick={this.props.history.goBack}>
                <SwapLeftOutlined style={{ fontSize: 20 }} />返回
              </Button>
              <span>商品详情</span>
            </div>
          }
        >
          <List>
            <Item>
              <span><b>商品名称:</b>xxx</span>
            </Item>
            <Item>
              <span>商品名称:xxx</span>
            </Item>
          </List>
        </Card>

      </div>
    )
  }
}
