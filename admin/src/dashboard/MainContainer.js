import React from 'react'
import { connect } from 'react-redux'
import { BaseContainer } from '../base'
import { showNotification } from '../notifications/actions'

const MainContainer = ({ showNotification }) => {
  return (
    <BaseContainer title="breadcrumb.dashboard">
      <div className="jumbotron">
        <h2>Bem-vindo!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </BaseContainer>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (message) => {
      return dispatch(showNotification(message))
    }
  }
}

export default connect(null, mapDispatchToProps)(MainContainer)