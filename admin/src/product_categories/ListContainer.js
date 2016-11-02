import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { fetchProductCategories } from './actions'
import { List, Datagrid, Button, Icon, SearchBox, Loader } from '../base/components'

// @todo Deixar mais modular e criar dentro de @base
class ImageLoader extends Component {
  onLoadError() {
    this.timeout = setTimeout(this.tryLoadImage.bind(this), 1000)
  }
  tryLoadImage() {
    this.refs.image.src = this.props.image
  }
  onLoadSuccess() {
    this.refs.box_image.className = 'loading-image'
  }
  render() {
    return (
      <div ref="box_image" className="loading-image active">
        <div className="spinner-box">
          <Loader />
        </div>
        <img
          ref="image"
          src={this.props.image}
          className="img-thumbnail"
          onLoad={this.onLoadSuccess.bind(this)}
          onError={this.onLoadError.bind(this)}
          width={50}
          />
      </div>
    )
  }
}

class ListContainer extends Component {
  componentDidMount() {
    this.props.fetchProductCategories({ page: 1 })
  }
  fetchData(page) {
    let options = { page: page }
    this.props.fetchProductCategories(options)
  }
  onSearch(search) {
    let options = { page: 1, search: search }
    this.props.fetchProductCategories(options)
  }
  render() {
    let header = [{
      label: 'ID',
      field: '_id',
      getValue: (item) => {
        return <code>{item._id}</code>
      }
    }, {
      label: 'Categoria',
      field: 'name',
    }, {
      label: 'Imagem',
      field: 'image',
      getValue: (item) => {
        if (item.image && item.image.thumb) {
          return <ImageLoader image={item.image.thumb} />
        }
      }
    }]
    let actions = [{
      id: 1,
      label: <Icon name="pencil" />,
      link: function(data) {
        return `/product_categories/${data._id}/edit`
      },
      button_options: { primary: true, xsmall: true, icon: true }
    }, {
      id: 2,
      label: <Icon name="trash" />,
      link: function(data) {
        return `/product_categories/${data._id}/remove`
      },
      button_options: { danger: true, xsmall: true, icon: true }
    }]
    return (
      <List 
        className="list"
        paging={this.props.product_category.list.paging}
        intl={this.props.intl}
        fetchData={this.fetchData.bind(this)}
        >
        <div className="actions-box">
          <SearchBox
            intl={this.props.intl}
            onSearch={this.onSearch.bind(this)}
            />
          <Link to="/product_categories/new">
            <Button success>
              <FormattedMessage id="actions.add" />
            </Button>
          </Link>
        </div>
        <Datagrid 
          header={header}
          data={this.props.product_category.list.data}
          data_key="_id"
          actions={actions}
          />
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product_category: state.product_category,
    intl: state.intl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductCategories: (options) => {
      dispatch(fetchProductCategories(options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
