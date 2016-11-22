import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Button, SwitchPaper } from '../../base/components'

export default class UserItemList extends Component {
  getImage() {
    if (this.props.picture) {
      return (
        <div className="user-item-picture">
          <img src={this.props.picture} className="img-circle" />
        </div>
      )
    }
  }
  toggleUser() {
    this.props.toggleUser(this.props._id, this.props.active)
  }
  render() {
    const userItemClassName = classNames({
      'user-item': true,
      'female': this.props.gender == 'female',
      'male': this.props.gender == 'male'
    })
    const userItemStatus = classNames({
      'user-item-status': true,
      'active': this.props.active,
    })
    return (
      <li className="block-grid-item">
        <div className={userItemClassName}>
          <span className={userItemStatus}>
            <SwitchPaper
              size="small"
              enabled={this.props.active}
              disabled={this.props.sending}
              onClick={this.toggleUser.bind(this)}
              />
          </span>
          {this.getImage()}
          <h2 className="user-item-name">{this.props.name}</h2>
          <p className="user-item-email">{this.props.email}</p>
          <p className="user-item-stats">
            <FormattedMessage
              id="users.donation_stats"
              defaultMessage={`Doando {donationCountTag} {donationCount, plural, one {item} other {itens}}`}
              values={{
                donationCount: this.props.products_count,
                donationCountTag: <strong>{this.props.products_count}</strong>
              }}
              />
          </p>
          {!this.props.show ? (
            <div className="user-item-actions">
              <Link to={`/users/${this.props._id}/show`}>
                <Button primary small>Detalhes</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </li>
    )
  }
}

UserItemList.defaultProps = {
  show: false
}

UserItemList.propTypes = {
  show: PropTypes.bool
}
