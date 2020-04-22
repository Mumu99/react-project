import React, { Component } from 'react'

export default class Detail extends Component {
  render() {
    return (
      <div>
        Detail
        <Button type='primary' onClick={() => { this.props.history.goBack() }}>回退</Button>
      </div>
    )
  }
}
