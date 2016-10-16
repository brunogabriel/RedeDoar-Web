import React, { Component } from 'react'

export default class DataGrid extends Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Coluna 1</th>
              <th>Coluna 2</th>
              <th>Coluna 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Valor 1</td>
              <td>Valor 2</td>
              <td>Valor 3</td>
            </tr>
            <tr>
              <td>Valor 1</td>
              <td>Valor 2</td>
              <td>Valor 3</td>
            </tr>
            <tr>
              <td>Valor 1</td>
              <td>Valor 2</td>
              <td>Valor 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
