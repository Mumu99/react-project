import React, { Component, Fragment } from 'react';
import { Card, Button, Table, Modal } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux'
import { createSaveCategoryAsyncAction } from '../../../../redux/actions/category'

class Category extends Component {


  state = {
    visible: false // 控制弹窗是否展示
  };

  // showModal控制展示弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 确定按钮的回调
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  // 取消按钮的回调
  handleCancel = () => {
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
      <Fragment>
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
          title="Basic Modal" // 弹窗的标题
          visible={this.state.visible} // 控制弹窗是否展示
          onOk={this.handleOk} // 确定回调
          onCancel={this.handleCancel} // 取消的回调
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Fragment>

    )
  }
}
export default connect(
  (state) => ({ categoryList: state.category }), // 传递状态
  { // 传递操作状态的方法
    saveCategory: createSaveCategoryAsyncAction
  }
)(Category)