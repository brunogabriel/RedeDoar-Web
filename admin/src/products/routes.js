import React from 'react'
import { Route, IndexRoute } from 'react-router'
import MainContainer from './MainContainer'
import ListContainer from './ListContainer'
import ShowContainer from './ShowContainer'

const routes =
  <Route path="/products" component={MainContainer}>
    <IndexRoute component={ListContainer} />
    <Route path="/products/:id/show" component={ShowContainer} />
  </Route>

export default routes
