import React, { Component } from 'react'
import { Button, Card, List } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'

const { Item } = List
export default class Detail extends Component {

  componentDidMount() {
    // 获取通过路由传递过来的商品_id
    let id = this.props.location.params.id
    console.log(id);
  }
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
              <span><b style={{ fontSize: 16 }}>商品名称:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 16 }}>商品描述:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 16 }}>商品价格:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 16 }}>所属分类:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 16 }}>商品图片:</b>xxx</span>
            </Item>
            <Item>
              <span><b style={{ fontSize: 16 }}>商品详情:</b>xxx</span>
            </Item>
          </List>
        </Card>

      </div>
    )
  }
}
