import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class SwitchPaper extends Component {
  onClick() {
    if (!this.props.disabled) {
      this.props.onClick()
    }
  }
  render() {
    let switch_class = classNames({
      'switch-paper': true,
      'small': this.props.size == 'small',
      'disabled': this.props.disabled,
      'on': this.props.enabled
    })
    return (
      <div className={switch_class} onClick={this.onClick.bind(this)}>
        <span></span>
      </div>
    )
  }
}

SwitchPaper.propTypes = {
  enabled: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func
}

SwitchPaper.defaultProps = {
  enabled: false,
  disabled: false,
  size: 'normal',
  onClick: null
}

export default SwitchPaper
