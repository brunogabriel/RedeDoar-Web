import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'

export default class Notification extends Component  {
  getMessage() {
    if (this.props.message) {
      if (!this.props.plain_message) {
        return <FormattedMessage id={this.props.message} />
      } else {
        return this.props.message
      }
    }
  }
  render() {
    let class_name = classnames({
      'notification': true,
      'notification-show': (this.props.status == 'show' || this.props.status == 'hiding'),
      'notification-hiding': this.props.status == 'hiding',
      'notification-hidden': this.props.status == 'hidden'
    })
    let class_name_time_left = classnames({ 'hide': this.props.time_left_cancelled })
    let class_name_time_left_cancelled = classnames({ 'hide': !this.props.time_left_cancelled })
    return (
      <div className={class_name}>
        <div className={`alert alert-${this.props.message_type}`} onClick={this.props.onClick} onMouseEnter={this.props.onMouseEnter}>
          {this.getMessage()}
          <br />
          <small>
            <span className={class_name_time_left}>
              <i>
                <FormattedMessage id="notifications.closing_in" values={{seconds: this.props.time_left}} />
              </i>
            </span>
            <span className={class_name_time_left_cancelled}>
              <i>
                <FormattedMessage id="notifications.click_to_close" />
              </i>
            </span>
          </small>
        </div>
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  message_type: PropTypes.string,
  message_duration: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  status: PropTypes.string,
  time_left: PropTypes.number,
  time_left_cancelled: PropTypes.bool,
  plain_message: PropTypes.bool
}
