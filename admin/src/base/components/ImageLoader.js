import React, { Component, PropTypes } from 'react'
import { Loader } from './'

export default class ImageLoader extends Component {
  componentDidMount() {
    this.count = 0
  }
  onLoadError() {
    if (this.count < 3) {
      this.count++
      this.timeout = setTimeout(this.tryLoadImage.bind(this), 2000)
    }
  }
  tryLoadImage() {
    this.refs.image.src = this.props.image
  }
  onLoadSuccess() {
    this.refs.box_image.className = 'loading-image'
  }
  render() {
    return (
      <div ref="box_image" className="loading-image active">
        <div className="spinner-box">
          <Loader />
        </div>
        <img
          ref="image"
          src={this.props.image}
          className={this.props.className}
          onLoad={this.onLoadSuccess.bind(this)}
          onError={this.onLoadError.bind(this)}
          width={this.props.size}
          />
      </div>
    )
  }
}

ImageLoader.defaultProps = {
  className: 'img-thumbnail',
  size: 50
}

ImageLoader.propTypes = {
  image: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string
}
