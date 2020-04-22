import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
export default class Bar extends Component {
  render() {
    return (
      <ReactEcharts option={this.getOption()} />
    )
  }
}
