import React, { Component } from 'react'

export default class List extends Component {
  render() {
    return (
      <div className="list-box">
        {this.props.children}
      </div>
    )
  }
}
