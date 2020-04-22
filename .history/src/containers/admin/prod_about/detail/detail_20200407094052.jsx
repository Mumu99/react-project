import React, { Component } from 'react'
import { Button, Card, List, message } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'
import { reqProductDetailById } from '../../../../ajax'

const { Item } = List
export default class Detail extends Component {

  state = {
    imgs: [], // 商品图片
    categoryId: '', // 商品Id
    name: '', // 商品名称
    desc: '', // 商品描述
    price: 0, // 商品价格
    detail: '', // 商品详情
  }

  getProductDetail = async () => {
    // 获取通过路由传递过来的商品_id
    const { id } = this.props.match.params
    let result = await reqProductDetailById(id)
    console.log(result);
    const { status, data, msg } = result
    if (status === 0) {
      const { name, desc, price, categoryId, imgs, detail } = data;
      this.setState({ name, desc, price, categoryId, imgs, detail })
    } else {
      message.error(msg)
    }
  }

  componentDidMount() {
    this.getProductDetail()
  }
  render() {
    const { name, desc, price, categoryId, imgs, detail } = this.state;
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
            <Item >
              <span style={{ maxWidth: 150, display: 'block' }}><b style={{ fontSize: 16 }}>商品名称:</b>{name}</span>
            </Item>
            <Item >
              <span style={{ maxWidth: 150, display: 'block' }}><b style={{ fontSize: 16 }}>商品描述:</b>{desc}</span>
            </Item>
            <Item >
              <span style={{ maxWidth: 150, display: 'block' }}><b style={{ fontSize: 16 }}>商品价格:</b>{price}</span>
            </Item>
            <Item >
              <span style={{ maxWidth: 150, display: 'block' }}><b style={{ fontSize: 16 }}>所属分类:</b>{categoryId}</span>
            </Item>
            <Item >
              <span style={{ maxWidth: 150, display: 'block' }}><b style={{ fontSize: 16 }}>商品图片:</b>{imgs}</span>
            </Item>
            <Item >
              <span style={{ maxWidth: 150, display: 'block' }}><b style={{ fontSize: 16 }}>商品详情:</b>{detail}</span>
            </Item>
          </List>
        </Card>

      </div>
    )
  }
}
