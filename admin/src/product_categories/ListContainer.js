import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Datagrid, Button, Icon } from '../base/components'
import { FormattedMessage } from 'react-intl'
import { fetchProductCategories } from './actions'

class ListContainer extends Component {
  componentDidMount() {
    this.props.fetchProductCategories({ page: 1 })
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
      <List className="list">
        <div className="actions-box">
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
    product_category: state.product_category
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
