import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { fetchUsers } from './actions'
import { SearchBox, Pagination } from '../base/components'
import { UserItemList } from './components'

import './styles.sass'

class ListContainer extends Component {
  componentDidMount() {
    this.props.fetchUsers({ page: 1 })
  }
  fetchData(page) {
    let options = { page: page }
    this.props.fetchUsers(options)
  }
  onSearch(search) {
    let options = { page: 1, search: search }
    this.props.fetchUsers(options)
  }
  render() {
    return (
      <div>
        <div className="actions-box">
          <SearchBox
            intl={this.props.intl}
            onSearch={this.onSearch.bind(this)}
            />
        </div>
        <ul className="users-list block-grid-lg-3 block-grid-md-2 block-grid-sm-1 block-grid-xs-1">
          {this.props.list.data.map((item) => {
            return <UserItemList key={item._id} {...item} />
          })}
        </ul>
        <Pagination
          paging={this.props.list.paging}
          intl={this.props.intl}
          fetchData={this.fetchData.bind(this)}
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
    intl: state.intl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (options) => {
      dispatch(fetchUsers(options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
