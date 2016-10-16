import React, { Component } from 'react'

class MainContainer extends Component {
  render() {
    return (
      <div>
        <h2>Categorias de produtos</h2>
        {this.props.children}
      </div>
    )
  }
}

export default MainContainer
