import React, { Component } from 'react'

export default class List extends Component {
  render() {
    return (
      <div className="list-box">
        <h3>Lista</h3>
        {this.props.children}
      </div>
    )
  }
}
