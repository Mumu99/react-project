import React, { Component, Fragment } from 'react';
import { Card, Button, Select, Input, Table, message } from 'antd';
import { SearchOutlined, PlusCircleFilled } from '@ant-design/icons'
import { reqProductList, reqSearchProduct } from '../../../../ajax'
import { PAGE_SIZE } from '../../../../config'
const { Option } = Select
export default class Product extends Component {

  state = {
    productList: [],// 商品列表
    total: 0,//数据总数
    searchType: 'productName', //搜索类型
    keyWord: '', //搜索的关键词
    current: 1, // 当前是第几页
    isLoading: true, // 是否是加载状态
  }

  // 初始化列表
  getProductList = async (page = 1) => {
    let result
    if (this.isSearch) {
      const { searchType, keyWord } = this.state;
      result = await reqSearchProduct(searchType, keyWord, page, PAGE_SIZE);
    } else {
      result = await reqProductList(page, PAGE_SIZE)
    }
    const { status, data, msg } = result
    if (status === 0) {
      const { list, total, pageNum } = data
      this.setState({ productList: list, total, current: pageNum, isLoading: false })
    } else {
      message.error(msg)
    }
  }

  changeProductStatus = (currentProduct) => {
    console.log(currentProduct);
  }
  componentDidMount() {
    // 调用商品的方法
    this.getProductList();
  }

  render() {
    // 数据源
    const dataSource = this.state.productList

    // 表格列的配置
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (price) => ('￥' + price)
      },
      {
        title: '状态',
        // dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (productObj) => (
          <div>
            <Button
              onClick={() => { this.changeProductStatus(productObj) }}
              type={productObj.status === 1 ? 'danger' : 'primary'}>
              {productObj.status === 1 ? '下架' : '上架'}
            </Button>
            <br />
            <span>{productObj.status === 1 ? '在售' : '售停'}</span>
          </div>
        )
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'opera',
        width: '10%',
        align: 'center',
        render: (id) => (
          <div>
            <Button type='link' onClick={() => { this.props.history.push(`/admin/prod_about/product/detail/${id}`) }} >详情</Button>
            <br />
            <Button type='link' onClick={() => { this.props.history.push(`/admin/prod_about/product/update/${id}`) }} >需改</Button>
          </div>
        )
      },
    ];

    return (
      <Fragment>
        <Card
          title={
            <div>
              <Select
                defaultValue='productName'
                onChange={(value) => this.setState({ searchType: value })}
              >
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
              </Select>
              <Input
                allowClear
                style={{ width: '25%', margin: '0 10px' }}
                placeholder="请输入关键词搜索"
                onChange={(e) => this.setState({ keyWord: e.target.value })}
              />
              <Button type='primary' onClick={() => {
                this.isSearch = true;
                this.getProductList()
              }}><SearchOutlined />搜索</Button>
            </div>
          }
          extra={
            <Button type="primary" onClick={() => { this.props.history.push('/admin/prod_about/product/add') }}>
              <PlusCircleFilled />添加商品
            </Button>
          }

        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey='_id'
            pagination={{
              total: this.state.total,
              pageSize: PAGE_SIZE,
              onChange: page => this.getProductList(page),
              current: this.state.current
            }}
            loading={this.state.isLoading}
          />
        </Card>
      </Fragment >
    )
  }
}
