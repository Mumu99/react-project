import React, { Component, Fragment } from 'react';
import { Card, Button, Select, Input, Table, message } from 'antd';
import { SearchOutlined, PlusCircleFilled } from '@ant-design/icons'
import { reqProductList } from '../../../../ajax'
import { PAGE_SIZE } from '../../../../config'
const { Option } = Select
export default class Product extends Component {

  state = {
    productList: [] // 商品列表
  }

  getProductList = async () => {
    let result = await reqProductList(1, PAGE_SIZE)
    const { status, data, msg } = result
    if (status === 0) {
      const { list } = data
      this.setState({ productList: list })
    } else {
      message.error(msg)
    }
    console.log(result);
  }

  componentDidMount() {
    this.getProductList()
  }
  render() {
    // 数据源
    const dataSource = [
      {
        key: '1',
        name: '测试商品1',
        desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        price: 65999,
        status: 1
      },
      {
        key: '2',
        name: '测试商品2',
        desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        price: 75699,
        status: 2
      },
      {
        key: '3',
        name: '测试商品3',
        desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        price: 65999,
        status: 3
      },
    ];

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
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (status) => (
          <div>
            <Button type={status === 1 ? 'danger' : 'primary'}>
              {status === 1 ? '下架' : '上架'}
            </Button>
            <br />
            <span>{status === 1 ? '在售' : '售停'}</span>
          </div>
        )
      },
      {
        title: '操作',
        // dataIndex: 'status',  
        key: 'opera',
        width: '10%',
        align: 'center',
        render: () => (
          <div>
            <Button type='link'>详情</Button>
            <br />
            <Button type='link'>需改</Button>
          </div>
        )
      },
    ];


    return (
      <Fragment>
        <Card
          title={
            <div>
              <Select defaultValue='name'>
                <Option value='name'>按名称搜索</Option>
                <Option value='desc'>按描述搜索</Option>
              </Select>

              <Input allowClear style={{ width: '25%', margin: '0 10px' }} placeholder="请输入关键词搜索" />

              <Button type='primary'><SearchOutlined />搜索</Button>
            </div>
          }
          extra={<Button type="primary">
            <PlusCircleFilled />添加分类
        </Button>}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
          />
        </Card>
      </Fragment >
    )
  }
}
