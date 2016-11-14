import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { SwitchPaper, Icon } from '../../base/components'
import moment from 'moment'

export default class ProductInfo extends Component {
  getImage() {
    if (this.props.images.length > 0) {
      return (
        <div className="product-image">
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
      if (this.props.user.active) {
        return (
          <div>
            <strong>
              <FormattedMessage id="users.fields.active" defaultMessage="Ativo" />
              <span>: </span>
            </strong>
            <SwitchPaper
              size="small"
              enabled={this.props.active}
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
      <div className="product-info">
        {this.getImage()}
        <div className="product-data">
          <small className="product-item-created-at">{moment(this.props.createdAt).format('LLL')}</small>
          <h2 className="product-item-title">{this.props.title}</h2>
          <p className="product-item-description">{this.props.description}</p>
          <ul className="product-data-list">
            <li>
              <strong>
                <FormattedMessage id="users.fields.delivery" defaultMessage="Forma de entrega" />
                <span>: </span>
              </strong>
              {this.props.delivery}
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
                <FormattedMessage id="users.fields.contact_type" defaultMessage="Forma de contato" />
                <span>: </span>
              </strong>
              {this.props.contact_type}
            </li>
            <li>
              <strong>
                <FormattedMessage id="users.fields.contact_value" defaultMessage="Valor do contato" />
                <span>: </span>
              </strong>
              {this.props.contact_value}
            </li>
            <li>
              {this.getStatus()}
              {this.getState()}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
