import React, { Component } from 'react'
import { Button, Card, Form, Input, Select, message } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { createSaveCategoryAsyncAction } from '../../../../redux/actions/category'
import PictureWall from './picture_wall'
import RichText from './rich_text'
import { reqAddProduct, reqProductDetailById, reqUpdateProduct } from '../../../../ajax'
const { Item } = Form
const { Option } = Select
class AddUpdate extends Component {

  state = {
    isUpdate: false
  }

  onFinish = async (values) => {
    values.imgs = this.refs.pictureWall.getImgsNameArr() // 找照片墙获取
    values.detail = this.refs.richText.getRichText() // 找rich_text组件获取商品的详情
    let result
    if (this.state.isUpdate) {
      values._id = this.id
      result = await reqAddProduct(values)
    } else {
      result = await reqAddProduct(values)
    }
    const { status, msg } = result
    if (status === 0) {
      message.success('商品添加成功');
      this.props.history.push('/admin/prod_about/product')
    } else {
      message.error(msg)
    }
  }

  getProductDetailById = async (id) => {
    let result = await reqProductDetailById(id)
    const { status, data, msg } = result
    if (status === 0) {
      this.refs.form.setFieldsValue(data) // 回调表单的基本数据
      this.refs.pictureWall.setFileList(data.imgs)// 回显照片墙
      this.refs.richText.setRichText(data.detail) // 回显富文本
    } else {
      message.error(msg)
    }
  }

  componentDidMount() {
    const { categoryList, saceCategory } = this.props
    if (!categoryList.length) saceCategory()
    // 尝试获取传递过来的id, 若有id就是修改商品, 没有就是新增商品
    const { id } = this.props.match.params
    if (id) {
      this.id = id;
      this.setState({ isUpdate: true })
      this.getProductDetailById(id)
    }
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
              <span>{this.state.isUpdate ? '修改商品' : '添加商品'}</span>
            </div>
          }
        >
          <Form
            onFinish={this.onFinish}
            ref='form'
          >
            <Item
              name='name'
              label='商品名称:'
              rules={[
                { required: true, message: '商品名称必填' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Input placeholder='输入商品名' />
            </Item>
            <Item
              name='desc'
              label='商品描述:'
              rules={[
                { required: true, message: '商品描述必填' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Input placeholder='输入商品描述信息' />
            </Item>
            <Item
              name='price'
              label='商品价格:'
              rules={[
                { required: true, message: '商品价格必填' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Input prefix="￥" suffix="元" type='number' placeholder='输入商品价格' />
            </Item>
            <Item
              name='categoryId'
              label='商品分类:'
              rules={[
                { required: true, message: '必须选中一个分类' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Select defaultValue=''>
                <Option value=''>请选择分类</Option>
                {
                  this.props.categoryList.map((categoryObj, index) => {
                    return <Option key={index} value={categoryObj._id}>{categoryObj.name}</Option>
                  })
                }
              </Select>
            </Item>
            <Item
              // name='productImgs'
              label='商品图片:'
              wrapperCol={{ span: 12 }}
              style={{ marginLeft: 11 }}
            >
              <PictureWall ref='pictureWall' />
            </Item>
            <Item
              // name='productDetail'
              label='商品详情:'
              wrapperCol={{ span: 16 }}
              style={{ marginLeft: 11 }}
            >
              <RichText ref='richText' />
            </Item>
            <Item>
              <Button type='primary' htmlType='submit'>提交</Button>
            </Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default connect(
  (state) => ({ categoryList: state.category }),
  {
    saceCategory: createSaveCategoryAsyncAction
  }
)(AddUpdate)
