import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { UserItemList, ProductItem } from './components'
import { Loader } from '../base/components'
import { fetchUser } from './actions'

class ShowContainer extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.params.id)
  }
  render() {
    if (!this.props.data._id) {
      if (this.props.sending) {
        return <Loader />
      }
      return (
        <div className="text-center">
          <h2>
            <FormattedMessage id="users.not_found" defaultMessage="Usuário não encontrado" />
          </h2>
          <p>
            <Link to="/users">
              <FormattedMessage id="actions.back" defaultMessage="Voltar" />
            </Link>
          </p>
        </div>
      )
    }
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            <ul className="users-list block-grid-xs-1">
              <UserItemList {...this.props.data} show={true} />
            </ul>
          </div>
          <div className="col-sm-8">
            <div className="user-products-list">
              <h3 className="user-products-main-title">
                <FormattedMessage
                  id="users.donation_items"
                  defaultMessage="Lista de items para doação"
                />
              </h3>
              {this.props.data.products.map((item) => {
                return <ProductItem key={item._id} {...item} />
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => {
      dispatch(fetchUser(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)
