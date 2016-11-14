import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { fetchUsers, enableDisableUser } from './actions'
import { SearchBox, Pagination } from '../base/components'
import { UserItemList } from './components'

import './styles.sass'

class ListContainer extends Component {
  componentDidMount() {
    this.fetchData(1)
  }
  fetchData(page, search = undefined) {
    search = search != undefined ? search : this.props.search
    this.props.fetchUsers({ page: page, search: search })
  }
  render() {
    return (
      <div>
        <div className="actions-box">
          <SearchBox
            intl={this.props.intl}
            search={this.props.search}
            onSearch={this.fetchData.bind(this, 1)}
            />
        </div>
        <ul className="users-list block-grid-lg-3 block-grid-md-2 block-grid-sm-1 block-grid-xs-1">
          {this.props.list.data.map((item) => {
            return <UserItemList
              key={item._id}
              {...item}
              enableDisableUser={this.props.enableDisableUser}
              />
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
    },
    enableDisableUser: (id, active) => {
      dispatch(enableDisableUser(id, active))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
