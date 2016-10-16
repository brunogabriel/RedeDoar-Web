import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { BaseContainer } from '../base'

class MainContainer extends Component {
  render() {
    return (
      <BaseContainer title="breadcrumb.product_categories">
        {this.props.children}
      </BaseContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.product_categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
