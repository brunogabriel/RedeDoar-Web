import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Dropzone from 'react-dropzone'

import { List, Datagrid, Button, Icon, SearchBox } from '../base/components'
import { fetchProductCategories, createProductCategory, dropFile } from './actions'

class DropzoneImage extends Component {
  getPreview() {
    if (this.props.file) {
      return <img src={this.props.file.preview} className="img-rounded" />
    }
  }
  render() {
    return (
      <div>
        <Dropzone onDrop={this.props.onDrop} className="dropzone" activeClassName="dropzone-active">
          <FormattedMessage id="product_categories.drop_file_here" />
          {this.getPreview()}
        </Dropzone>
      </div>
    )
  }
}

class FormContainer extends Component {
  componentDidMount() {
    // this.props.fetchProductCategories({ page: 1 })
  }
  handleSubmit(e) {
    e.preventDefault()
    let data = {
      name: this.refs.name.value,
      image: this.props.product_category.file
    }
    this.props.createProductCategory(data)
  }
  onDrop(files) {
    console.log('Received files: ', files)
    this.props.dropFile(files[0])
  }
  render() {
    const btn_class = classNames({
      'btn': true,
      'btn-success': true,
      'btn-lg': true,
      'disabled': this.props.product_category.sending
    })
    return (
      <div>
        <form action="#" onSubmit={this.handleSubmit.bind(this)} method="post" className="">
          <div className="form-group">
            <label htmlFor="name">
              <FormattedMessage id="product_categories.fields.name" />
            </label>
            <input type="text" className="form-control" id="name" ref="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="image">
              <FormattedMessage id="product_categories.fields.image" />
            </label>
            <DropzoneImage
              onDrop={this.onDrop.bind(this)}
              file={this.props.product_category.file}
              />
          </div>
          <button className={btn_class} disabled={this.props.product_category.sending}>
            <FormattedMessage id="actions.save" />
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product_category: state.product_category,
    intl: state.intl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dropFile: (file) => {
      dispatch(dropFile(file))
    },
    createProductCategory: (data) => {
      dispatch(createProductCategory(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
