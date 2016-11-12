import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { fetchUsers } from './actions'

class ListContainer extends Component {
  componentDidMount() {
    this.props.fetchUsers({ page: 1 })
  }
  render() {
    return (
      <div>
        <h1>lista</h1>
        <ul>
          {this.props.list.data.map((item) => {
            return (
              <li key={item._id}>
                {item.name}
              </li>
            )
          })}
        </ul>
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
    fetchUsers: (options) => {
      dispatch(fetchUsers(options))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer)
