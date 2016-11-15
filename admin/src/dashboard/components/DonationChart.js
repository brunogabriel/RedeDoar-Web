import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import { Loader } from '../../base/components'

export default class DonationChart extends Component {
  getBody() {
    if (this.props.data == undefined) return <Loader />
    const config = {
      chart: {
        style: {
          fontFamily: 'inherit',
        },
      },
      title: { text: 'Doações mensais' },
      credits: false,
      xAxis: {
        categories: this.props.data.map(item => item.month)
      },
      yAxis: {
        title: false
      },
      series: [{
        name: 'Doações',
        data: this.props.data.map(item => item.count)
      }]
    }
    return (
      <ReactHighcharts config={config} />
    )
  }
  render() {
    return (
      <div className="dashboard-chart-box">
        <div className="panel panel-default">
          <div className="panel-body">
            {this.getBody()}
          </div>
        </div>
      </div>
    )
  }
}

