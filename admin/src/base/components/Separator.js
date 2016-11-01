import React, { Component, PropTypes } from 'react'

class Separator extends Component {
  render() {
    const { size, type } = this.props
    let value
    switch (type) {
      case 'dot': value = '&#149;'; break;
      case 'dash': value = '&ndash;'; break;
    }
    return (
      <span 
        className={`separator-${size}`} 
        dangerouslySetInnerHTML={{ __html: value }}></span>
    )
  }
}

Separator.propType = {
  size: PropTypes.number,
  type: PropTypes.string
}

Separator.defaultProps = {
  size: 10,
  type: ''
}

export default Separator
