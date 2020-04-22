import React, { Component } from 'react'
import { Card, Button, Table, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
import { reqRoleList } from '../../../ajax'
export default class Role extends Component {

  state = {
    roleList: [],//角色列表
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

  render() {
    // 数据源
    const dataSource = [

    ];

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
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
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
            <Button type='primary'>
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
      </div>
    )
  }
}
