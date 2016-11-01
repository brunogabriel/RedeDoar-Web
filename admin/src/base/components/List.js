import React, { Component } from 'react'
import { Pagination } from './'

export default class List extends Component {
  render() {
    return (
      <div className="list-box">
        {this.props.children}
        <Pagination
          paging={this.props.paging}
          intl={this.props.intl}
          fetchData={this.props.fetchData}
          />
      </div>
    )
  }
}
