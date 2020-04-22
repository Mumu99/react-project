import React, { Component } from 'react';
import { Card, Button, Table, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'

export default class Category extends Component {

  state = {
    categoryList: []
  }

  // 请求分类信息
  componentDidMount() {
    // 通知redux
  }

  render() {
    // dataSource是数据源
    const dataSource = []

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
        render: () => <Button type='link'>修改分类</Button>
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
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={{ // 分页器
            pageSize: 4, // 每页展示多少条数据
            showQuickJumper: 'true',
            LocaleProvider: '去'
          }}
          rowKey='_id'
        />;

      </Card>
    )
  }
}
