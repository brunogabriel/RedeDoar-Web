import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hideNotification, hideTimeOutNotification, cancelTimeOutNotification } from './actions'
import { Notification } from './components'

class MainContainer extends Component {
  render() {
    this.props.hideTimeOutNotification(this.props.notification)
    return (
      <Notification 
        {...this.props.notification} 
        onClick={this.props.hideNotification} 
        onMouseEnter={this.props.cancelTimeOutNotification}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideNotification: () => {
      dispatch(hideNotification())
    },
    hideTimeOutNotification: (notification) => {
      dispatch(hideTimeOutNotification(notification))
    },
    cancelTimeOutNotification: () => {
      dispatch(cancelTimeOutNotification())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
