import React, { Component } from 'react';
import { Card, Button, Table, Pagination } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
import { reqCategoryList } from '../../../../ajax'

export default class Category extends Component {

  getCategory = async () => {
    let result = await reqCategoryList();

    console.log(result);
  }

  componentDidMount() {
    // 请求分类信息
    this.getCategory()
  }
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
        gender: '男'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
        gender: '男'
      },
      {
        key: '3',
        name: '猪妈妈',
        age: 18,
        address: '九江修水南桥金泰华庭',
        gender: '男'
      },
    ];
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'age',
        key: 'age',
        align: 'center'
      },
    ];
    return (

      <Card
        extra={
          <Button type='primary' >
            <PlusCircleFilled />
            添加分类
          </Button>
        }
      >
        <button onClick={this.getCategory}>获取商品分类</button>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={{ // 分页器
            pageSize: 4 // 每页展示多少条数据
          }}
        />;

      </Card>
    )
  }
}
