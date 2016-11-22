import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as reducers from './reducers'

const middleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(middleware),
  applyMiddleware(thunkMiddleware),
  // applyMiddleware(thunkMiddleware, createLogger())
)

export default store
