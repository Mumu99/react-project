import React, { Component } from 'react'
import { Button, Card, Form, Input, Select } from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { createSaveCategoryAsyncAction } from '../../../../redux/actions/category'

const { Item } = Form
const { Option } = Select
class AddUpdate extends Component {

  onFinish = (values) => {
    console.log(values);
  }

  componentDidMount() {
    const { categoryList, saceCategory } = this.props
    if (!categoryList.length) {
      saceCategory()
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
              <span>添加商品</span>
            </div>
          }
        >
          <Form onFinish={this.onFinish}>
            <Item
              name='productName'
              label='商品名称:'
              rules={[
                { required: true, message: '商品名称必填' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Input placeholder='输入商品名' />
            </Item>
            <Item
              name='productDesc'
              label='商品描述:'
              rules={[
                { required: true, message: '商品描述必填' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Input placeholder='输入商品描述信息' />
            </Item>
            <Item
              name='productPrice'
              label='商品价格:'
              rules={[
                { required: true, message: '商品价格必填' }
              ]}
              wrapperCol={{ span: 10 }}
            >
              <Input prefix="￥" suffix="元" type='number' placeholder='输入商品价格' />
            </Item>
            <Item
              name='productCategory'
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
              wrapperCol={{ span: 10 }}
              style={{ marginLeft: 11 }}
            >
              antd的上传
            </Item>
            <Item
              // name='productDetail'
              label='商品详情:'
              wrapperCol={{ span: 10 }}
              style={{ marginLeft: 11 }}
            >
              antd的富文本
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
