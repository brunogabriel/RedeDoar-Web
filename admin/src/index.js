import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// import { Router, Route, browserHistory, IndexRoute } from 'react-router-redux'

import store from './store'
// import * as containers from './containers'
import { Provider } from 'react-intl-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

// containers
import { MainContainer as LoginContainer } from './auth'
import { MainContainer as AppContainer } from './base'
import { MainContainer as DashboardContainer } from './dashboard'

// routes
import { routes as productCategoriesRoutes } from './product_categories'

// styles
import '../scss/app.sass'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.user,
  wrapperDisplayName: 'UserIsAuthenticated'
})

// <Route path="/login" component={containers.LoginFormContainer} />
// <Route path="/" component={UserIsAuthenticated(containers.AppContainer)}>
//   <IndexRoute component={containers.DashboardContainer} />
//   <Route path="/dashboard" component={containers.DashboardContainer} />
//   <Route path="/companies" component={containers.CompaniesContainer}>
//     <IndexRoute component={containers.CompaniesTableContainer} />
//     <Route path="/companies/:id" component={containers.CompaniesViewContainer} />
//   </Route>
//   <Route path="/jobs" component={containers.JobsContainer}>
//     <IndexRoute component={containers.JobsTableContainer} />
//     <Route path="/jobs/:id" component={containers.JobsViewContainer} />
//   </Route>
//   <Route path="*" component={containers.NoMatchContainer} />
// </Route>

// const AppContainer = ({ children }) => {
//   return (
//     <div>
//       <h1>AppContainer</h1>
//       {children}
//     </div>
//   )
// }

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={LoginContainer} />
      <Route path="/" component={UserIsAuthenticated(AppContainer)}>
        <IndexRoute component={DashboardContainer} />
        <Route path="/dashboard" component={DashboardContainer} />
        {productCategoriesRoutes}
      </Route>
    </Router>
  </Provider>
), document.getElementById('content'))
