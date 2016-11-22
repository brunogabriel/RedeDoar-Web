import request from 'superagent'
import { push } from 'react-router-redux'
import { api, error } from '../../helpers'
import { enableMainLoader, disableMainLoader } from '../../base/actions/spinner'
import {
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_USER,
  RECEIVE_USER,
  TOGGLE_ACTIVE_USER,
  TOGGLE_ACTIVE_PRODUCT_USER,
  ENABLE_USER_SENDING
} from '../constants'

function requestUsers(options) {
  return {
    type: REQUEST_USERS,
    ...options
  }
}

function receiveUsers(list) {
  return {
    type: RECEIVE_USERS,
    list
  }
}

function requestUser(id) {
  return {
    type: REQUEST_USER,
    id
  }
}

function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user
  }
}

export function fetchUsers({ page = 1, limit = 9, order = '-_id', callback = null, search = null, filter = 'name' }) {
  return (dispatch) => {
    enableMainLoader()
    if (!callback) {
      dispatch(requestUsers({ page: page, search: search }))
    }
    request
      .post(api.url('/users'))
      .query(api.params({
        page: page,
        limit: limit,
        order: order,
        search: search,
        filter: filter
      }))
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          if (!callback) {
            const list = {
              data: res.body.data,
              paging: res.body.paging
            }
            dispatch(receiveUsers(list))
          } else {
            callback(res.body)
          }
        }
        disableMainLoader()
      })
  }
}

export function fetchUser(id) {
  return (dispatch) => {
    dispatch(requestUser(id))
    request
      .post(api.url(`/users/${id}`))
      .send(api.params())
      .set('Accept', 'application/json')
      .end((err, res) => {
        let user = {}
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          user = res.body.data
        }
        dispatch(receiveUser(user))
      })
  }
}

export function toggleUser(id, active) {
  return (dispatch) => {
    dispatch({ type: ENABLE_USER_SENDING })
    request
      .post(api.url(`/users/${id}/change-status`))
      .send(api.params({
        active: !active
      }))
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          if (res.body.status) {
            dispatch({ type: TOGGLE_ACTIVE_USER, id })
          }
        }
      })
  }
}

export function toggleProduct(id, active) {
  return (dispatch) => {
    dispatch({ type: ENABLE_USER_SENDING })
    request
      .post(api.url(`/products/${id}/change-status`))
      .send(api.params({
        active: !active
      }))
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          if (res.body.status) {
            dispatch({ type: TOGGLE_ACTIVE_PRODUCT_USER, id })
          }
        }
      })
  }
}
