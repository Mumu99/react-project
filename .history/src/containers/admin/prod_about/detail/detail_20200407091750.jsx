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
              <span><b style={{ fontSize: 18 }}>商品名称:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 18 }}>商品描述:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 18 }}>商品价格:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 18 }}>所属分类:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 18 }}>商品图片:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 18 }}>商品详情:</b>xxx</span>
            </Item>
          </List>
        </Card>

      </div>
    )
  }
}
