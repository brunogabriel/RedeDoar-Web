import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Nav } from './components'
import { MainContainer as NotificationContainer } from '../notifications'
import { meta, translate } from '../helpers'
import { Loader } from '../base/components'
import { body } from '../helpers'

class BaseContainer extends Component {
  constructor(props) {
    super(props)
    let messages = translate.getMessages(this.props)
    this.title = messages[this.props.title] || this.props.title
    meta.setTitle(this.title)
  }
  render() {
    return(
      <div>
        <div className="main-loader-box">
          <div className="spinner-box">
            <Loader />
          </div>
        </div>
        <Nav />
        <header className="header main-header">
          <div className="container-fluid">
            <h1>{this.title}</h1>
          </div>
        </header>
        <div className="container-fluid container-main-content">
          <NotificationContainer />
          {this.props.children}
        </div>
        <div className="container-fluid">
          <footer className="main-footer">
            <hr />
            <p>
              <small>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              </small>
            </p>
          </footer>
        </div>
      </div>
    )
  }
}

BaseContainer.propTypes = {
  title: PropTypes.string
}

const mapStateToProps = (state) => { return { intl: state.intl } }
const mapDispatchToProps = (dispatch) => {
  return {
    enableMainLoader: function() {
      body.addClass('with-main-loader')
    },
    disableMainLoader: function() {
      body.removeClass('with-main-loader')
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer)
