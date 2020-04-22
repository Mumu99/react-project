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
  showModal = (currentCategory) => {
    // 如果是新增窗口, currentCategory就是默认的event
    // 如果是修改窗口, currentCategory就是当前要修改的
    const { _id, name } = currentCategory
    if (_id && name) {
      // 修改
      this._id = _id;
      this.name = name;
      console.log(this._id, this.name, '修改');
      this.isUpdate = true; // 标识是否为新增
    } else {
      console.log('新增');
      this._id = '';
      this.name = '';
      this.isUpdate = false;
    }
    // console.log(this.refs.categoryForm);
    // 重置表单
    if (this.refs.categoryForm) {
      this.refs.categoryForm.resetFields();
    }

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
    const dataSource = [...this.props.categoryList]

    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        // dataIndex: 'name', // 这里输入name 就是render的参数就是name
        key: 'operation',
        align: 'center',
        width: '15%',
        render: (categoryObj) => <Button type='link' onClick={() => { this.showModal(categoryObj) }}>修改分类</Button>
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
            dataSource={dataSource.reverse()} // 数据源
            columns={columns}
            bordered // 边框
            pagination={{ // 分页器
              pageSize: 4, // 每页展示多少条数据
              showQuickJumper: 'true',
            }}
            rowKey='_id'// 告诉table以什么作为key
          />

        </Card>
        <Modal
          title={this.isUpdate ? '修改分类' : "新增分类"} // 弹窗的标题
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
              <Input defaultValue={this.name} placeholder='请输入分类名' />
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