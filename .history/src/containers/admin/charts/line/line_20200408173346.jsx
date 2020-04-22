import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component {
  // 用于提供一个配置对象
  getOption = () => {
    return {
      title: { // 图标的标题
        text: '服装报表',
        textStyle: {
          color: 'green'
        }
      },
      tooltip: { // 提示框的配置
        showDelay: 100
      },
      toolbox: {
        feature: {
          saveAsImage: {

          }
        }
      },
      legend: { // 图例
        data: ['销量', '库存']
      },
      // x轴的配置
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      // y轴的配置
      yAxis: {},
      series: [{ // 图标类型 + 数据
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      },
      { // 图标类型 + 数据
        name: '库存',
        type: 'bar',
        data: [1, 2, 3, 4, 5, 6]
      }
      ]
    };

  }
  render() {
    return (
      <ReactEcharts option={this.getOption()} />
    )
  }
}
