import React, { Component, Fragment } from 'react'
import { Card, Button, Table, message, Modal, Form, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs'
import { reqRoleList, reqRoleAdd } from '../../../ajax'

const { Item } = Form
export default class Role extends Component {

  state = {
    roleList: [],//角色列表
    visible: false // 是否展示新增角色弹窗
  }

  getRoleList = async () => {
    let result = await reqRoleList()
    const { status, data, msg } = result

    if (status === 0) this.setState({ roleList: data })
    else message.error(msg)
  }
  componentDidMount() {
    this.getRoleList()
  }

  // 展示新增角色的弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 新增角色弹窗- 确认按钮的回调
  handleOk = async () => {
    const { roleName } = this.refs.roleForm.getFieldsValue();
    let result = await reqRoleAdd(roleName);
    const { status, msg } = result
    if (status === 0) {

    } else {
      message.error(msg)
    }
    console.log(result);
    this.refs.roleForm.resetFields();
    this.setState({ visible: false, });
  };

  // 新增角色弹窗- 取消按钮的回调
  handleCancel = () => {
    this.refs.roleForm.resetFields();
    this.setState({ visible: false, });
  };

  render() {
    // 数据源
    const dataSource = this.state.roleList

    //表格列的配置
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (create_time) => dayjs(create_time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render: (auth_time) => auth_time ? dayjs(auth_time).format('YYYY年 MM月DD日 HH:mm:ss') : '暂未授权'
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
        render: (auth_name) => auth_name ? auth_name : '暂未授权'
      },
      {
        title: '操作',
        // dataIndex: 'roleName',
        key: 'cz',
        render: () => <Button type='link'>设置权限</Button>
      }
    ];
    return (
      <Fragment>
        <Card
          title={
            <Button
              type='primary'
              onClick={this.showModal}
            >
              <PlusCircleFilled />添加角色
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey='_id'
          />
        </Card>
        <Modal
          title="新增角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确定'
          cancelText='取消'
        >
          <Form ref='roleForm'>
            <Item
              name='roleName'
              label='角色名:'
              rules={[
                { required: true, message: '角色名必须输入' }
              ]}
            >
              <Input placeholder='请输入角色名' />
            </Item>
          </Form>
        </Modal>
      </Fragment>
    )
  }
}
