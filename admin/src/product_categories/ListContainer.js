import React, { Component } from 'react'
import { List, Datagrid, Button, Icon } from '../base/components'
import { FormattedMessage } from 'react-intl'

class ListContainer extends Component {
  render() {
    let header = [{
      label: 'ID',
      field: 'id',
    }, {
      label: 'Título',
      field: 'title',
    }]
    let data = [{
      id: '1',
      title: 'um',
    }, {
      id: '2',
      title: 'dois',
    }]
    let actions = [{
      id: 1,
      label: <Icon name="pencil" size="24" />,
      link: '/posts/{{id}}/edit',
      button_options: { primary: true, small: true }
    }, {
      id: 2,
      label: <Icon name="trash" size="24" />,
      link: '/posts/{{id}}/remove',
      button_options: { danger: true, small: true }
    }]
    return (
      <List className="list">
        <div className="actions-box">
          <Button success>
            <FormattedMessage id="actions.add" />
          </Button>
        </div>
        <Datagrid 
          header={header}
          data={data}
          actions={actions}
          />
      </List>
    )
  }
}

export default ListContainer
