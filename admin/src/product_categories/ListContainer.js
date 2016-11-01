import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Datagrid, Button, Icon, SearchBox } from '../base/components'
import { FormattedMessage } from 'react-intl'
import { fetchProductCategories } from './actions'

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
    }, {
      label: 'Categoria',
      field: 'name',
    }, {
      label: 'Imagem',
      field: 'image',
      getValue: (item) => {
        if (item.image && item.image.thumb) {
          return <img src={item.image.thumb} className="img-thumbnail" width={50} />
        }
      }
    }]
    let actions = [{
      id: 1,
      label: <Icon name="pencil" />,
      link: '/posts/{{id}}/edit',
      button_options: { primary: true, xsmall: true, icon: true }
    }, {
      id: 2,
      label: <Icon name="trash" />,
      link: '/posts/{{id}}/remove',
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
          <Button success>
            <FormattedMessage id="actions.add" />
          </Button>
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
