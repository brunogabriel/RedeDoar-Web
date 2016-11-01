import React, { Component, PropTypes } from 'react'
import { FormattedPlural } from 'react-intl'
import classNames from 'classnames'
import { translate } from '../../helpers'

class PaginationLink extends Component {
  static defaultProps = {
    current_link: false,
    disabled_link: false
  }
  static propTypes = {
    current_link: PropTypes.bool,
    disabled_link: PropTypes.bool
  }
  classLi() {
    return classNames({
      'active': this.props.current_link,
      'disabled': this.props.disabled_link
    })
  }
  render() {
    return (
      <li className={this.classLi()}>
        <a href="#" onClick={this.props.onClick}>{this.props.label}</a>
      </li>
    )
  }
}

export default class Pagination extends Component {
  numbers(max, current_page) {
    let all = []
    let i = 1
    while (i <= max) {
      let key = `number-${i}`
      all.push(
        <PaginationLink
          key={key}
          label={i}
          current_link={current_page == i}
          onClick={this.onClick.bind(this, i)}
          />
      )
      i++
    }
    return all
  }
  onClick(page, e) {
    e.preventDefault()
    const { paging } = this.props
    if (page != paging.page) this.props.fetchData(page)
  }
  nextClick(e) {
    e.preventDefault()
    const { paging } = this.props
    let page = paging.page + 1
    if (page > paging.pages) page = paging.pages
    if (!this.disableLink('next')) this.onClick(page, e)
  }
  prevClick(e) {
    e.preventDefault()
    const { paging } = this.props
    let page = paging.page - 1
    if (page < 1) page = 1
    if (!this.disableLink('prev')) this.onClick(page, e)
  }
  disableLink(direction) {
    const { paging } = this.props
    if (direction == 'prev') {
      if (paging.page == 1) return true
    } else if (direction == 'next') {
      if (paging.page == paging.pages) return true
    }
    return false
  }
  render() {
    const { paging } = this.props
    let messages = translate.getMessages(this.props)
    return (
      <div className="text-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <PaginationLink
              key='previous'
              label={messages['pagination.prev']}
              disabled_link={this.disableLink('prev')}
              onClick={this.prevClick.bind(this)}
              />
            {this.numbers(paging.pages, paging.page)}
            <PaginationLink
              key='next'
              label={messages['pagination.next']}
              disabled_link={this.disableLink('next')}
              onClick={this.nextClick.bind(this)}
              />
          </ul>
        </nav>
        <p>
          <strong>{paging.pages} </strong>
          <FormattedPlural value={parseInt(paging.pages)}
            one={messages['pagination.page']}
            other={messages['pagination.pages']}
            />
        </p>
      </div>
    )
  }
}
