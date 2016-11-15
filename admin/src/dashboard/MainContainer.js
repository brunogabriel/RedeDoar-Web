import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactHighcharts from 'react-highcharts'
import { BaseContainer } from '../base'
import { fetchStats } from './actions'
import {
  DonationChart,
  ActiveDonationsCounter,
  CanceledDonationsCounter,
  DonationsMadeCounter
} from './components'

import './styles.sass'

class MainContainer extends Component {
  componentDidMount() {
    this.props.fetchStats()
  }
  render() {
    return (
      <BaseContainer title="breadcrumb.dashboard">
        <div className="row">
          <div className="col-sm-6">
            <DonationChart data={this.props.stats.donation} />
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-12">
                <ActiveDonationsCounter data={this.props.stats.active_donations} />
                <DonationsMadeCounter data={this.props.stats.donations_made} />
                <CanceledDonationsCounter data={this.props.stats.canceled_donations} />
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.dashboard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStats: () => {
      return dispatch(fetchStats())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
