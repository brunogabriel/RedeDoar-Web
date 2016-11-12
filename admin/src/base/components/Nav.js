import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { toggleMobileNav, toggleDropdown, setCurrentNavItem } from '../actions/nav'
import { changeLanguage } from '../../intl/actions'
import { logout } from '../../auth/actions'
import { LanguageItem } from './'

class Nav extends Component {
  toggleDropdown(name, e) {
    e.preventDefault()
    this.props.onToggleDropdown(name);
  }
  renderNav(item) {
    let current_key = null
    if (this.props.nav.current_nav_item) {
      current_key = this.props.nav.current_nav_item.key
    }
    let className = classNames({
      'active': item.key == current_key
    })
    let label = this.props.intl.messages[item.label] || item.label
    return (
      <li className={className} key={item.key}>
        <Link to={item.link} onClick={this.setCurrentNavItem.bind(this, item)}>
          {label}
        </Link>
      </li>
    )
  }
  setCurrentNavItem(nav_item) {
    this.props.onSetCurrentNavItem(nav_item)
  }
  onChangeLanguage(locale, e) {
    e.preventDefault()
    this.props.onChangeLanguage(locale)
  }
  dropdownClassname(name) {
    return classNames({
      'dropdown': true,
      'open': name == this.props.nav.current_opened_dropdown
    })
  }
  render() {
    let navbarClassname = classNames({
      'navbar-collapse': true,
      'collapse': true,
      'in': this.props.nav.opened_nav
    })
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={this.props.onToggleMobileNav}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand with-logo" to="/">
              <img src="/images/logo.png" className="logo" />
            </Link>
          </div>
          <div id="navbar" className={navbarClassname}>
            <ul className="nav navbar-nav" ref="main_nav">
              {this.props.links.map(item => this.renderNav(item))}
            </ul>
            <ul className="nav navbar-nav navbar-user">
              <li className={this.dropdownClassname('user')} onClick={this.toggleDropdown.bind(this, 'user')}>
                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <FormattedMessage id="nav.hello" />
                  <span> {this.props.user.name}</span>
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <small className="no-link">
                      <FormattedMessage id="nav.change_language" />
                    </small>
                  </li>
                  {this.props.intl.options.map(item => 
                    <LanguageItem
                      key={item.locale}
                      {...item}
                      current_locale={this.props.locale}
                      onClick={this.onChangeLanguage.bind(this, item.locale)}
                      />
                  )}
                  <li className="divider"></li>
                  <li>
                    <a href="#" onClick={this.props.onLogout.bind(this)}>
                      <FormattedMessage id="nav.logout" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Nav.defaultProps = {
  links: [
    { label: 'nav.dashboard', link: '/', key: 'home' },
    { label: 'nav.product_categories', link: '/product_categories', key: 'product_categories' },
    { label: 'nav.users', link: '/users', key: 'users' }
  ]
}

Nav.propTypes = {
  links: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    routing: state.routing,
    nav: state.nav,
    user: state.auth.user,
    intl: state.intl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleMobileNav: () => {
      dispatch(toggleMobileNav())
    },
    onToggleDropdown: (name) => {
      dispatch(toggleDropdown(name))
    },
    onSetCurrentNavItem: (nav_item) => {
      dispatch(setCurrentNavItem(nav_item))
    },
    onChangeLanguage: (locale) => {
      dispatch(changeLanguage(locale))
    },
    onLogout: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
