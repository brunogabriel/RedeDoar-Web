import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Dropzone from 'react-dropzone'

import {
  List, Datagrid, Button, Icon, SearchBox, Loader, ImageLoader
} from '../base/components'
import {
  fetchProductCategory, createProductCategory, updateProductCategory, dropFile
} from './actions'

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
    this.loaded = false
    if (this.props.params.id) {
      this.props.fetchProductCategory(this.props.params.id)
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.props.params.id && !this.loaded) {
      const { data } = nextProps.product_category
      if (data && data._id) {
        this.loaded = true
        this.refs.name.value = data.name
      }
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    let data = {
      name: this.refs.name.value,
      image: this.props.product_category.file
    }
    if (this.props.params.id) {
      this.props.updateProductCategory(this.props.params.id, data)
    } else {
      this.props.createProductCategory(data)
    }
  }
  onDrop(files) {
    this.props.dropFile(files[0])
  }
  currentImage() {
    if (this.props.params.id) {
      const { data } = this.props.product_category
      if (data && data.image) {
        return (
          <div className="form-group">
            <div className="text-center">
              <div className="">
                <label>Image atual</label>
              </div>
              <ImageLoader
                image={data.image.large}
                size={200}
                className="img-thumbnail"
                />
            </div>
          </div>
        )
      }
    }
  }
  render() {
    const btn_class = classNames({
      'btn': true,
      'btn-success': true,
      'btn-lg': true,
      'disabled': this.props.product_category.sending
    })
    const box_class_name = classNames({
      'form-box': true,
      'fetch': this.props.product_category.sending
    })
    return (
      <div className={box_class_name}>
        <div className="spinner-box">
          <Loader />
        </div>
        <form action="#" onSubmit={this.handleSubmit.bind(this)} method="post" className="">
          <div className="form-group">
            <label htmlFor="name">
              <FormattedMessage id="product_categories.fields.name" />
            </label>
            <input type="text" className="form-control" id="name" ref="name" required />
          </div>
          {this.currentImage()}
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
    },
    updateProductCategory: (id, data) => {
      dispatch(updateProductCategory(id, data))
    },
    fetchProductCategory: (id) => {
      dispatch(fetchProductCategory(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
