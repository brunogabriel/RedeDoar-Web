import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { BaseContainer } from './'

class NoMatchContainer extends Component {
  render() {
    return (
      <BaseContainer title="breadcrumb.not_found">
        <FormattedMessage id="not_found.page_not_found" />
      </BaseContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    intl: state.intl
  }
}

export default connect(mapStateToProps, null)(NoMatchContainer)
