import React, { Component } from 'react';
import { Card, Button, Table, Modal } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux'
import { createSaveCategoryAsyncAction } from '../../../../redux/actions/category'

class Category extends Component {


  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  // 请求分类信息
  componentDidMount() {
    // 通知redux
    this.props.saveCategory()
  }

  render() {
    // dataSource是数据源
    const dataSource = this.props.categoryList

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
          <Button type='primary' onClick={this.showModal}>
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
      <Modal
        title="Basic Modal"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }
}
export default connect(
  (state) => ({ categoryList: state.category }), // 传递状态
  { // 传递操作状态的方法
    saveCategory: createSaveCategoryAsyncAction
  }
)(Category)