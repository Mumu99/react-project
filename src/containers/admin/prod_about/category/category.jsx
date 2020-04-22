import React, { Component, Fragment } from 'react';
import { Card, Button, Table, Modal, Form, Input, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { createSaveCategoryAsyncAction, createSaveCategoryAction } from '../../../../redux/actions/category'
import { reqAddCategoryList, reqUpdateCategory } from '../../../../ajax'
import { PAGE_SIZE } from '../../../../config'

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
    let result
    // 获取输入框内的值
    const { categoryName } = this.refs.categoryForm.getFieldsValue();
    if (!categoryName) {
      message.error('不能为空')
    } else {
      if (this.isUpdate) {
        console.log(this._id, categoryName);
        result = await reqUpdateCategory(this._id, categoryName)
      } else {
        result = await reqAddCategoryList(categoryName)
      }
      const { status, msg } = result
      // console.log(data);
      if (status === 0) {
        message.success(this.isUpdate ? '修改分类成功' : '添加成功');
        this.props.saveCategory()
        // 通知redux在他保存的那个分类列表中加入一个data
        // this.props.saceNewCategory([...this.props.categoryList, data]);
        // 重置表单
        this.refs.categoryForm.resetFields();
        this.setState({ visible: false, });
      } else {
        message.error(msg);
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
            <Button onClick={this.showModal} type="primary">
              <PlusCircleOutlined />添加分类
						</Button>
          }
        >
          <Table
            dataSource={dataSource.reverse()}  //数据源
            columns={columns} //列的配置
            bordered //边框
            pagination={{ //分页器
              pageSize: PAGE_SIZE, //每页展示多少条数据
              showQuickJumper: true
            }}
            rowKey="_id"//告诉Table以每个数据的_id属性作为唯一标识

          />
        </Card>
        <Modal
          title={this.isUpdate ? '修改分类' : '新增分类'} //弹窗的标题
          visible={this.state.visible} //控制弹窗是否展示
          onOk={this.handleOk} //确认的回调
          onCancel={this.handleCancel}//确认的回调
          okText="确认"
          cancelText="取消"
        >
          <Form ref="categoryForm">
            <Item
              name='categoryName'
              rules={[{ required: true, message: '分类名必填' }]}
            >
              <Input defaultValue={this.name} placeholder="请输入分类名" />
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