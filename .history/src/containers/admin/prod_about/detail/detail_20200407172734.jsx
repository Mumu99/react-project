import React, { Component } from 'react'
import { Button, Card, List, message } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'
import { reqProductDetailById } from '../../../../ajax'
import { createSaveCategoryAsyncAction } from '../../../../redux/actions/category'
import { connect } from 'react-redux'
import './css/detail.less'

const { Item } = List
class Detail extends Component {

  state = {
    imgs: [], // 商品图片
    categoryId: '', // 商品Id
    name: '', // 商品名称
    desc: '', // 商品描述
    price: 0, // 商品价格
    detail: '', // 商品详情
    isLoading: true, // 是否是加载状态
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
    const { name, desc, price, categoryId, imgs, detail, isLoading } = this.state;
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
          <List loading={isLoading}>
            <Item className='product-item' >
              <span className='item-title'>
                商品名称:
              </span>
              <span>{name}</span>
            </Item>
            <Item >
              <span >
                商品描述:
              </span>
              <span>{desc}</span>
            </Item>
            <Item >
              <span >商品价格:</span>
              <span>{'￥' + price}</span>
            </Item>
            <Item >
              <span >
                所属分类:
              </span>
              <span>{this.getCategoryName(categoryId)}</span>
            </Item>
            <Item >
              <span >
                商品图片:
              </span>
              {
                imgs.map(
                  (imgName, index) =>
                    <img key={index} src={'/upload/' + imgName} alt="pic" />
                )
              }
            </Item>
            <Item >
              <span >
                商品详情:
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