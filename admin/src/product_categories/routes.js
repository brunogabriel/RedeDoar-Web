import React from 'react'
import { Route, IndexRoute } from 'react-router'
import MainContainer from './MainContainer'
import ListContainer from './ListContainer'

const routes =
  <Route path="/product_categories" component={MainContainer}>
    <IndexRoute component={ListContainer} />
  </Route>

export default routes
