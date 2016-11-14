import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class SwitchPaper extends Component {
  render() {
    let switch_class = classNames({
      'switch-paper': true,
      'small': this.props.size == 'small',
      'on': this.props.enabled
    })
    return (
      <div className={switch_class} onClick={this.props.onClick}>
        <span></span>
      </div>
    )
  }
}

SwitchPaper.propTypes = {
  enabled: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func
}

SwitchPaper.defaultProps = {
  enabled: false,
  size: 'normal',
  onClick: null
}

export default SwitchPaper
