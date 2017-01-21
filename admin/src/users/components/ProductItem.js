import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { SwitchPaper, Icon } from '../../base/components'
import moment from 'moment'

export default class ProductItem extends Component {
  getImage() {
    if (this.props.images.length > 0) {
      return (
        <div className="user-product-image">
          {this.props.images.map((image) => {
            return <img key={image._id} src={image.thumb} className="img-thumbnail" />
          })}
        </div>
      )
    }
  }
  toggleProduct() {
    this.props.toggleProduct(this.props._id, this.props.active)
  }
  getStatus() {
    if (!this.props.state) {
      if (this.props.userActive) {
        return (
          <div>
            <strong>
              <FormattedMessage id="users.fields.active" defaultMessage="Ativo" />
              <span>: </span>
            </strong>
            <SwitchPaper
              size="small"
              enabled={this.props.active}
              disabled={this.props.sending}
              onClick={this.toggleProduct.bind(this)}
              />
          </div>
        )
      } else {
        return (
          <div>
            <strong>
              <FormattedMessage id="users.fields.active" defaultMessage="Ativo" />
              <span>: </span>
            </strong>
            <FormattedMessage id="users.fields.disabled" defaultMessage="Inativo" />
          </div>
        )
      }
    }
  }
  getState() {
    if (this.props.state == 'donated') {
      if (this.props.to_user) {
        let userLink = (
          <Link to={`/users/${this.props.to_user._id}/show`} className="btn btn-info btn-xs">
            <Icon name="link" size={24} /> <strong>{this.props.to_user.name}</strong>
          </Link>
        )
        return (
          <FormattedMessage
            id="users.products.donated_to_user"
            defaultMessage="Doado para {name}"
            values={{ name: userLink }}
            />
        )
      } else {
        return (
          <FormattedMessage
            id="users.products.donated_somebody"
            defaultMessage="Doado para alguêm de fora do app"
            />
        )
      }
    } else if (this.props.state == 'cancelled') {
      return (
        <FormattedMessage
          id="users.products.cancelled_donation"
          defaultMessage="Doacão cancelada"
          />
      )
    }
  }
  render() {
    return (
      <div className="user-product-item">
        {this.getImage()}
        <div className="user-product-data">
          <small className="user-product-item-created-at">{moment(this.props.createdAt).format('LLL')}</small>
          <h2 className="user-product-item-title">{this.props.title}</h2>
          <p className="user-product-item-description">{this.props.description}</p>
          <ul className="user-product-data-list">
            <li>
              <strong>
                <FormattedMessage id="users.fields.delivery" defaultMessage="Forma de entrega" />
                <span>: </span>
              </strong>
              {this.props.delivery_label}
            </li>
            <li>
              <strong>
                <FormattedMessage id="users.fields.condition" defaultMessage="Condição" />
                <span>: </span>
              </strong>
              {this.props.condition}
            </li>
            <li>
              <strong>
                <FormattedMessage id="users.fields.category" defaultMessage="Categoria" />
                <span>: </span>
              </strong>
              {this.props.category ? 
                this.props.category.name : 
                <FormattedMessage id="users.category_not_found" defaultMessage="Categoria não encontrada" />
              }
            </li>
            <li>
              <strong>
                <FormattedMessage id="users.fields.email" defaultMessage="E-mail" />
                <span>: </span>
              </strong>
              {this.props.email}
            </li>
            <li>
              <strong>
                <FormattedMessage id="users.fields.telephone" defaultMessage="Telefone" />
                <span>: </span>
              </strong>
              {this.props.telephone}
            </li>
            <li>
              {this.getStatus()}
              {this.getState()}
            </li>
          </ul>
          <Link to={`/products/${this.props._id}/show`} className="btn btn-primary btn-sm">
            <FormattedMessage id="actions.details" defaultMessage="Detalhes" />
          </Link>
        </div>
      </div>
    )
  }
}
