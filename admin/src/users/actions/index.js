import request from 'superagent'
import { push } from 'react-router-redux'
import { api, error } from '../../helpers'
import {
  REQUEST_USERS,
  RECEIVE_USERS
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

export function fetchUsers({ page = 1, limit = 10, order = '-_id', callback = null, search = null, filter = 'name' }) {
  return (dispatch) => {
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
      })
  }
}
