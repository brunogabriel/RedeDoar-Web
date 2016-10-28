import React, { Component } from 'react'
import { Button } from './'

const ActionItem = ({ data, action }) => {
  return (
    <Button {...action.button_options}>
      {action.label}
    </Button>
  )
}

const Actions = ({ data, actions }) => {
  return (
    <div className="table-actions">
      {actions.map((action) => {
        const key = `${data.id}-${action.id}`
        return <ActionItem key={key} action={action} data={data} />
      })}
    </div>
  )
}

export default class Datagrid extends Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {this.props.header.map((item) => {
                return <th key={item.label}>{item.label}</th>
              })}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((item) => {
              return (
                <tr key={item.id}>
                  {this.props.header.map((header) => {
                    return <td key={`${item.id}-${header.field}`}>{item[header.field]}</td>
                  })}
                  <td>
                    <Actions data={item} actions={this.props.actions} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
