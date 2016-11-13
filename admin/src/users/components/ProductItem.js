import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
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
              <strong>
                <FormattedMessage id="users.fields.active" defaultMessage="Ativo" />
                <span>: </span>
              </strong>
              {this.props.active ? 
                <FormattedMessage id="user.fields.enabled" defaultMessage="Ativo" /> : 
                <FormattedMessage id="user.fields.disabled" defaultMessage="Desativado" />
              }
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
