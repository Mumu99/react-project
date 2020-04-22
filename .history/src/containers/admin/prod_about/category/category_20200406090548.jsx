import React, { Component, Fragment } from 'react';
import { Card, Button, Table, Modal, Form, Input, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux'
import { createSaveCategoryAsyncAction, createSaveCategoryAction } from '../../../../redux/actions/category'
import { reqAddCategoryList } from '../../../../ajax'

const { Item } = Form
class Category extends Component {

  state = {
    visible: false, // 控制弹窗是否展示

  };

  // showModal控制展示弹窗
  showModal = () => {
    // 重置表单
    // this.refs.categoryForm.resetFields();
    this.setState({ visible: true, })
  };

  // 确定按钮的回调
  handleOk = async () => {
    // 获取输入框内的值
    const { categoryName } = this.refs.categoryForm.getFieldsValue();
    if (!categoryName) {
      message.error('不能为空')
    } else {
      let result = await reqAddCategoryList(categoryName)
      const { status, msg, data } = result
      // console.log(data);
      if (status === 0) {
        message.success('添加成功');
        // 通知redux在他保存的那个分类列表中加入一个data
        this.props.saceNewCategory([...this.props.categoryList, data]);
        // 重置表单
        this.refs.categoryForm.resetFields();
        this.setState({ visible: false, });
      } else {
        message.error(msg);
        // 重置表单
        this.refs.categoryForm.resetFields();
      }

    }
  }
  // 取消按钮的回调
  handleCancel = () => {
    this.setState({ visible: false, });
    // 重置表单
    this.refs.categoryForm.resetFields();
  }


  // 请求分类信息
  componentDidMount() {
    // 通知redux
    this.props.saveCategory()
  }

  render() {
    // dataSource是数据源
    const dataSource = this.props.categoryList

    const arr2 = dataSource.reverse();

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
            dataSource={arr2} // 数据源
            columns={columns}
            bordered // 边框
            pagination={{ // 分页器
              pageSize: 4, // 每页展示多少条数据
              showQuickJumper: 'true',
              LocaleProvider: '去'
            }}
            rowKey='_id'// 告诉table以什么作为key
          />

        </Card>
        <Modal
          title="添加分类" // 弹窗的标题
          visible={this.state.visible} // 控制弹窗是否展示
          onOk={this.handleOk} // 确定回调
          onCancel={this.handleCancel} // 取消的回调
          okText='确定'
          cancelText='取消'
        >
          <Form ref='categoryForm'>
            <Item
              name="categoryName"
              rules={[
                { required: true, message: '分类名为必填项!' }
              ]}
            >
              <Input placeholder='请输入分类名' />
            </Item>
          </Form>
        </Modal>
      </Fragment>

    )
  }
}
export default connect(
  (state) => ({ categoryList: state.category }), // 传递状态
  { // 传递操作状态的方法
    saveCategory: createSaveCategoryAsyncAction,
    saceNewCategory: createSaveCategoryAction
  }
)(Category)