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
        name: '测试分类1',
      },
      {
        key: '2',
        name: '测试分类2',
      },
      {
        key: '3',
        name: '测试分类3',
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
        // dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        width: '15%',
        render: () => {
          return <Button type='link'>修改分类</Button>
        },
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
