import React, { Component } from 'react'
import { List, DataGrid, Button } from '../base/components'
import { FormattedMessage } from 'react-intl'

class ListContainer extends Component {
  render() {
    return (
      <List className="list">
        <div className="actions-box">
          <Button success>
            <FormattedMessage id="actions.add" />
          </Button>
        </div>
        <DataGrid />
      </List>
    )
  }
}

export default ListContainer
