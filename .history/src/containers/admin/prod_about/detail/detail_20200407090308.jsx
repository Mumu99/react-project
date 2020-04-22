import React, { Component } from 'react'
import { Button, Card } from 'antd'

export default class Detail extends Component {
  render() {
    return (
      <div>
        <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Button type='primary' onClick={() => { this.props.history.goBack() }}>回退</Button>
      </div>
    )
  }
}
