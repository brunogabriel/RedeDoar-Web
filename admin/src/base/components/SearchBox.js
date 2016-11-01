import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Icon, Separator, Button } from './'
import { translate } from '../../helpers'

export default class SearchBox extends Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.onSearch(this.refs.search.value)
    this.refs.search.select()
  }
  render() {
    let messages = translate.getMessages(this.props)
    return (
      <div className="table-search-box">
        <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder={messages['actions.search']} ref="search" defaultValue={this.props.search} />
          </div>
          <Separator />
          <Button type="submit" primary xsmall icon>
            <Icon name="search" />
          </Button>
        </form>
      </div>
    )
  }
}

SearchBox.propTypes = {
  search: PropTypes.string
}

SearchBox.defaultProps = {
  search: ''
}

