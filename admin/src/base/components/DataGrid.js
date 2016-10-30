import React, { Component, PropTypes } from 'react'
import { Button } from './'

const ActionItem = ({ data, action }) => {
  return (
    <Button {...action.button_options}>
      {action.label}
    </Button>
  )
}

const Actions = ({ data, actions, data_key }) => {
  return (
    <div className="table-actions">
      {actions.map((action) => {
        const item_key = getItemKey(data_key, data)
        const key = `${item_key}-${action.id}`
        return <ActionItem key={key} action={action} data={data} />
      })}
    </div>
  )
}

const getItemKey = (data_key, data) => {
  return data[data_key]
}

export default class Datagrid extends Component {
  getItemValue(item, header) {
    let value = item[header.field]
    if (typeof header.getValue == 'function') {
      value = header.getValue(item)
    }
    return value
  }
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
              const item_key = getItemKey(this.props.data_key, item)
              return (
                <tr key={item_key}>
                  {this.props.header.map((header) => {
                    return <td key={`${item_key}-${header.field}`}>{this.getItemValue(item, header)}</td>
                  })}
                  <td>
                    <Actions
                      data={item}
                      actions={this.props.actions}
                      data_key={this.props.data_key}
                      />
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

Datagrid.defaultProps = {
  data_key: "id"
}

Datagrid.propTypes = {
  data_key: PropTypes.string,
  header: PropTypes.array,
  data: PropTypes.array
}
