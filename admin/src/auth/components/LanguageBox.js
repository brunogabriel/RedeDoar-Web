import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, LanguageItem } from '../../base/components'
import { changeLanguage } from '../actions'
import classNames from 'classnames'

class LanguageBox extends Component {
  onChangeLanguage(locale, e) {
    e.preventDefault()
    this.props.onChangeLanguage(locale)
  }
  render() {
    return (
      <div className="text-center">
        <hr />
        <ul className="list-inline">
          {this.props.options.map(item => 
            <LanguageItem
              key={item.locale}
              {...item}
              current_locale={this.props.locale}
              onClick={this.onChangeLanguage.bind(this, item.locale)}
              />
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.intl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeLanguage: (locale) => {
      dispatch(changeLanguage(locale))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageBox)
