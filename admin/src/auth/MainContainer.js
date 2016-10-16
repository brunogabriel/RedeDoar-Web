import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import { Loader } from '../base/components'
import { LoginForm, LanguageBox } from './components'
import { submitLogin, checkSession } from './actions'
// import { NotificationContainer } from './'
// import { meta, translate } from '../helpers'
// import { checkLocaleInQuery } from '../actions/intl'

class MainContainer extends Component {
  componentDidMount() {
    // let messages = translate.getMessages(this.props)
    // meta.setTitle(messages['auth.login'])
    this.props.onCheckLocaleInQuery(this.props.location.query)
    this.props.checkSession();
  }
  render() {
    let container_loader_class = classNames({
      'container-loader': true,
      'on': this.props.checking_session
    })

        // <NotificationContainer />
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className={container_loader_class}>
              <div className="loader-box">
                <Loader />
              </div>
              <div className="main-content-loader">
                <h2>
                  <FormattedMessage id="auth.login" />
                </h2>
                <LoginForm {...this.props} />
                <LanguageBox />
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
    // onCheckLocaleInQuery: (query) => {
    //   dispatch(checkLocaleInQuery(query))
    // },
    checkSession: () => {
      dispatch(checkSession())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
