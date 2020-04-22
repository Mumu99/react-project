import React, { Component } from 'react'
import { Button, Card } from 'antd'

export default class Add_update extends Component {
  render() {
    return (
      <div>
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Button type='primary' onClick={() => { this.props.history.goBack() }}>回退</Button>
      </div>
    )
  }
}
