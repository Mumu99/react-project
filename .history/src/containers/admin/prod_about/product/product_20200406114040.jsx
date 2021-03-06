import React, { Component, Fragment } from 'react';
import { Card, Button, Select, Input, Table } from 'antd';
import { SearchOutlined, PlusCircleFilled } from '@ant-design/icons'
const { Option } = Select
export default class Product extends Component {
  render() {
    // 数据源
    const dataSource = [
      {
        key: '1',
        name: '测试商品1',
        desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        price: 65999,
      },
      {
        key: '2',
        name: '测试商品2',
        desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        price: 75699,
        status: 1
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
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
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
