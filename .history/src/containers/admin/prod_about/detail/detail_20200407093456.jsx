import React, { Component } from 'react'
import { Button, Card, List } from 'antd'
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
    const { name, desc, price, categoryId, imgs, detail } = this.state;
  }

  componentDidMount() {
    this.getProductDetail()
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
