import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { fetchProducts, enableDisableUser } from './actions'
import { SearchBox, Pagination, Datagrid, ImageLoader, Icon } from '../base/components'

class ListContainer extends Component {
  componentDidMount() {
    this.fetchData(1)
  }
  fetchData(page, search = undefined) {
    search = search != undefined ? search : this.props.product.search
    this.props.fetchProducts({ page: page, search: search })
  }
  render() {
    let header = [{
      label: 'Imagem',
      field: 'image',
      getValue: (item) => {
        if (item.images.length > 0) {
          return <ImageLoader image={item.images[0].thumb} size={50} />
        }
      }
    }, {
      label: 'Título',
      field: 'title',
    }, {
      label: 'Usuário',
      field: 'user',
      getValue: (item) => {
        if (item.user) {
          return (
            <Link to={`/users/${item.user._id}/show`} className="btn btn-info btn-xs">
              <Icon name="link" size={24} /> <strong>{item.user.name}</strong>
            </Link>
          )
        }
      }
    }, {
      label: 'Data',
      field: 'createdAt',
      getValue: (item) => {
        return moment(item.createdAt).format('LLL')
      }
    }]
    let actions = [{
      id: 1,
      label: <Icon name="pencil" />,
      link: function(data) {
        return `/products/${data._id}/show`
      },
      button_options: { primary: true, xsmall: true, icon: true }
    }]
    return (
      <div>
        <div className="actions-box">
          <SearchBox
            intl={this.props.intl}
            search={this.props.product.search}
            onSearch={this.fetchData.bind(this, 1)}
            />
        </div>
        <Datagrid 
          header={header}
          data={this.props.product.list.data}
          data_key="_id"
          actions={actions}
          />
        <Pagination
          paging={this.props.product.list.paging}
          intl={this.props.intl}
          fetchData={this.fetchData.bind(this)}
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    intl: state.intl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (options) => {
      dispatch(fetchProducts(options))
    },
    enableDisableUser: (id, active) => {
      dispatch(enableDisableUser(id, active))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
