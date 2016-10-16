import React, { Component } from 'react'
import { List, DataGrid } from '../base/components'

class ListContainer extends Component {
  render() {
    return (
      <List className="list">
        <DataGrid />
      </List>
    )
  }
}

export default ListContainer
