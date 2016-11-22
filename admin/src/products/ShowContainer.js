import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Loader } from '../base/components'
import { fetchProduct, toggleProduct } from './actions'
import { ProductInfo } from './components'

import './styles.sass'

class ShowContainer extends Component {
  componentDidMount() {
    this.fetchProduct()
  }
  componentDidUpdate() {
    this.fetchProduct()
  }
  fetchProduct() {
    if (!this.props.sending && this.props.data._id != this.props.params.id) {
      this.props.fetchProduct(this.props.params.id)
    }
  }
  render() {
    if (!this.props.data._id) {
      if (this.props.sending) {
        return <Loader />
      }
      return (
        <div className="text-center">
          <h2>
            <FormattedMessage id="products.not_found" defaultMessage="Doação não encontrada" />
          </h2>
          <p>
            <Link to="/products">
              <FormattedMessage id="actions.back" defaultMessage="Voltar" />
            </Link>
          </p>
        </div>
      )
    }
    return (
      <div className="row">
        <div className="col-sm-12">
          <ProductInfo
            {...this.props.data}
            toggleProduct={this.props.toggleProduct}
            sending={this.props.sending}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => {
      dispatch(fetchProduct(id))
    },
    toggleProduct: (id, active) => {
      dispatch(toggleProduct(id, active))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)
