import React, { Component } from 'react'
import { BaseContainer } from '../base'

class MainContainer extends Component {
  render() {
    return (
      <BaseContainer title="breadcrumb.users">
        {this.props.children}
      </BaseContainer>
    )
  }
}

export default MainContainer
