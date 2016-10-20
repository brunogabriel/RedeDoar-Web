import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import { Loader } from '../base/components'
import { LoginForm, LanguageBox } from './components'
import { submitLogin, checkSession } from './actions'
import { MainContainer as NotificationContainer } from '../notifications/'
import { meta, translate } from '../helpers'
import { checkLocaleInQuery } from '../intl/actions'

class MainContainer extends Component {
  componentDidMount() {
    let messages = translate.getMessages(this.props)
    meta.setTitle(messages['auth.login'])
    this.props.onCheckLocaleInQuery(this.props.location.query)
    this.props.checkSession();
  }
  render() {
    let container_loader_class = classNames({
      'container-loader': true,
      'on': this.props.checking_session
    })

    return(
      <div className="container-fluid">
        <NotificationContainer />
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className={container_loader_class}>
              <div className="loader-box">
                <Loader />
              </div>
              <div className="login-container main-content-loader">
                <div className="row">
                  <div className="col-sm-8">
                    <img src="/images/logo-black.png" className="logo-black" />
                  </div>
                  <div className="col-sm-4">
                    <LoginForm {...this.props} />
                  </div>
                  <div className="col-sm-12">
                    <LanguageBox />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
    intl: state.intl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      return dispatch(submitLogin(data))
    },
    onCheckLocaleInQuery: (query) => {
      dispatch(checkLocaleInQuery(query))
    },
    checkSession: () => {
      dispatch(checkSession())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
