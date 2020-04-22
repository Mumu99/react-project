import React, { Component } from 'react'
import { Button } from 'antd'

export default class Add_update extends Component {
  render() {
    return (
      <div>
        我是Add_update
        <Button type='primary' onClick={() => { this.props.history.goBack }}>回退</Button>
      </div>
    )
  }
}
