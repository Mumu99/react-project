import React, { Component } from 'react'
import { Button, Card, List, message } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'
import { reqProductDetailById } from '../../../../ajax'
import { createSaveCategoryAsyncAction } from '../../../../redux/actions/category'
import { connect } from 'react-redux'

const { Item } = List
class Detail extends Component {

  state = {
    imgs: [], // 商品图片
    categoryId: '', // 商品Id
    name: '', // 商品名称
    desc: '', // 商品描述
    price: 0, // 商品价格
    detail: '', // 商品详情
    isLoading: true,
  }

  // 根据分类id计算分类名
  getCategoryName = (categoryId) => {
    let result = this.props.category.find((categortObj) => {
      return categortObj._id === categoryId
    })
    if (result) {
      return result.name
    }
  }
  // 获取通过路由传递过来的商品_id
  getProductDetail = async () => {

    const { id } = this.props.match.params
    let result = await reqProductDetailById(id)
    console.log(result);
    const { status, data, msg } = result
    if (status === 0) {
      const { name, desc, price, categoryId, imgs, detail } = data;
      this.setState({ name, desc, price, categoryId, imgs, detail, isLoading: false })
    } else {
      message.error(msg)
    }
  }

  componentDidMount() {
    this.getProductDetail()
    const { category, saveCategory } = this.props
    if (!category.length) {
      console.log('@@');
      saveCategory()
    }
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
          <List isLoading>
            <Item style={{ display: 'flex', justifyContent: ' left' }}>
              <span style={{ minWidth: 100 }}>
                <b style={{ fontSize: 16 }}>商品名称:</b>
              </span>
              <span>{name}</span>
            </Item>
            <Item style={{ display: 'flex', justifyContent: ' left' }}>
              <span style={{ minWidth: 100 }}>
                <b style={{ fontSize: 16 }}>商品描述:</b>
              </span>
              <span>{desc}</span>
            </Item>
            <Item style={{ display: 'flex', justifyContent: ' left' }}>
              <span style={{ minWidth: 100 }}><b style={{ fontSize: 16 }}>商品价格:</b></span>
              <span>{'￥' + price}</span>
            </Item>
            <Item style={{ display: 'flex', justifyContent: ' left' }}>
              <span style={{ minWidth: 100 }}>
                <b style={{ fontSize: 16 }}>所属分类:</b>
              </span>
              <span>{this.getCategoryName(categoryId)}</span>
            </Item>
            <Item style={{ display: 'flex', justifyContent: ' left' }}>
              <span style={{ minWidth: 100 }}>
                <b style={{ fontSize: 16 }}>商品图片:</b>
              </span>
              {
                imgs.map(
                  (imgName, index) =>
                    <img key={index} src={'/upload/' + imgName} alt="pic" />
                )
              }
            </Item>
            <Item style={{ display: 'flex', justifyContent: ' left' }}>
              <span style={{ minWidth: 100 }}>
                <b style={{ fontSize: 16 }}>商品详情:</b>
              </span>
              <span dangerouslySetInnerHTML={{ __html: detail }}></span>
            </Item>

          </List>
        </Card>

      </div>
    )
  }
}
export default connect(
  (state) => ({ category: state.category }),
  {
    saveCategory: createSaveCategoryAsyncAction
  }
)(Detail)