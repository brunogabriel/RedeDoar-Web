import React, { Component } from 'react'
import { BaseContainer } from '../base'

class MainContainer extends Component {
  render() {
    return (
      <BaseContainer title="breadcrumb.users" ref="baseContainer">
        {this.props.children}
      </BaseContainer>
    )
  }
}

export default MainContainer
