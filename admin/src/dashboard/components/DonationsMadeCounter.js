import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Loader } from '../../base/components'

export default class DonationsMadeCounter extends Component {
  getBody() {
    if (this.props.data == undefined) return <Loader />
    return (
      <div className="donation-counter-value">{this.props.data}</div>
    )
  }
  render() {
    return (
      <div className="dashboard-counter-box">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <div className="donation-counter-title">
              <FormattedMessage id="dashboard.counter.donations_made" defaultMessage="Doações concretizadas" />
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

