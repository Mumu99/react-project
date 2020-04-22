import React, { Component } from 'react';
import { Card, Button, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux'
import { createSaveCategoryAsyncAction } from '../../../../redux/actions/category'

class Category extends Component {

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
    ]
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
        />

      </Card>
    )
  }
}
export default connect(
  (state) => ({ category }), // 传递状态
  { // 传递操作状态的方法
    saveCategory: createSaveCategoryAsyncAction
  }
)(Category)