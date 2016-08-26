import React, { Component } from 'react'
import ReactDom from 'react-dom'

require('../scss/app.scss')

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>RedeDoar Admin</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae eaque sint, saepe autem harum officia praesentium, alias reprehenderit accusantium, totam atque, eos. Ab rerum eligendi voluptatibus suscipit magni, explicabo nihil.</p>
            <p>
              <a href="#" className="btn btn-primary">Entrar</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
