import React from 'react'
import { Route, IndexRoute } from 'react-router'
import MainContainer from './MainContainer'
import ListContainer from './ListContainer'
import FormContainer from './FormContainer'

const routes =
  <Route path="/product_categories" component={MainContainer}>
    <IndexRoute component={ListContainer} />
    <Route path="/product_categories/new" component={FormContainer} />
    <Route path="/product_categories/:id/edit" component={FormContainer} />
  </Route>

export default routes
