import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Loader } from '../../base/components'

export default class ActiveDonationsCounter extends Component {
  getBody() {
    if (this.props.data == undefined) return <Loader />
    return (
      <div className="donation-counter-value">{this.props.data}</div>
    )
  }
  render() {
    return (
      <div className="dashboard-counter-box">
        <div className="panel panel-success">
          <div className="panel-heading">
            <div className="donation-counter-title">
              <FormattedMessage id="dashboard.counter.active_donations" defaultMessage="Doações ativas" />
              <span>: </span>
            </div>
          </div>
          <div className="panel-body">
            {this.getBody()}
          </div>
        </div>
      </div>
    )
  }
}

