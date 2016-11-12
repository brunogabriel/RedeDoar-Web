import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-intl-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

// redux store
import store from './store'

// containers
import { MainContainer as LoginContainer } from './auth'
import { MainContainer as AppContainer } from './base'
import { MainContainer as DashboardContainer } from './dashboard'
import { NoMatchContainer } from './base'

// routes
import { routes as productCategoriesRoutes } from './product_categories'
import { routes as usersRoutes } from './users'

// styles
import '../scss/app.sass'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.user,
  wrapperDisplayName: 'UserIsAuthenticated'
})

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={LoginContainer} />
      <Route path="/" component={UserIsAuthenticated(AppContainer)}>
        <IndexRoute component={DashboardContainer} />
        <Route path="/dashboard" component={DashboardContainer} />
        {productCategoriesRoutes}
        {usersRoutes}
        <Route path="*" component={NoMatchContainer} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
