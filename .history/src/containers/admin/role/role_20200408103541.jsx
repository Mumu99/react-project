import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs'
import { reqRoleList } from '../../../ajax'
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
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
      <div>
        <Card
          title={
            <Button type='primary' onClick={this.showModal}>
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
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}
