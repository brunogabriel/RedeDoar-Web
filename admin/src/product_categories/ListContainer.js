import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { fetchProductCategories, deleteProductCategory } from './actions'
import { showDialog, hideDialog } from '../base/actions/dialog'
import {
  List, Datagrid, Button, Icon, SearchBox, ImageLoader, Dialog
} from '../base/components'

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
      label: 'Imagem',
      field: 'image',
      getValue: (item) => {
        if (item.image && item.image.thumb) {
          return <ImageLoader image={item.image.thumb} size={50} />
        }
      }
    }, {
      label: 'Categoria',
      field: 'name',
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
        return `/product_categories/${data._id}/delete`
      },
      button_options: { danger: true, xsmall: true, icon: true },
      context: this,
      onClick: function(data, e) {
        e.preventDefault()
        this.props.showDialog({
          onSuccess: () => {
            this.props.deleteProductCategory(data._id)
            this.props.hideDialog()
          },
          onClose: this.props.hideDialog
        })
      }
    }]
    return (
      <List 
        className="list"
        paging={this.props.product_category.list.paging}
        intl={this.props.intl}
        fetchData={this.fetchData.bind(this)}
        >
        <Dialog {...this.props.dialog} />
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
    intl: state.intl,
    dialog: state.dialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductCategories: (options) => {
      dispatch(fetchProductCategories(options))
    },
    deleteProductCategory: (id) => {
      dispatch(deleteProductCategory(id))
    },
    showDialog: (options) => {
      dispatch(showDialog(options))
    },
    hideDialog: () => {
      dispatch(hideDialog())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
