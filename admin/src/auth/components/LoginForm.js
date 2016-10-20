import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

class LoginForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.props.onSubmit(data)
  }
  render() {
    const btn_class = classNames({
      'btn': true,
      'btn-primary': true,
      'btn-block': true,
      'disabled': this.props.sending
    })
    const form_class = classNames({
      'shake-me': this.props.error
    })
    return (
      <form action="#" onSubmit={this.handleSubmit.bind(this)} method="post" className={form_class}>
        <div className="form-group">
          <label htmlFor="username">
            <FormattedMessage id="auth.username" />
          </label>
          <input type="text" className="form-control" id="username" ref="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <FormattedMessage id="auth.password" />
          </label>
          <input type="password" className="form-control" id="password" ref="password" required />
        </div>
        <button className={btn_class} disabled={this.props.sending}>
          <FormattedMessage id="actions.enter" />
        </button>
      </form>
    )
  }
}

LoginForm.propTypes = {
  sending: PropTypes.bool,
  error: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default LoginForm
