import request from 'superagent'
import { push } from 'react-router-redux'
import { api, error } from '../../helpers'
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  REQUEST_PRODUCT,
  RECEIVE_PRODUCT,
  TOGGLE_ACTIVE_PRODUCT
} from '../constants'

function requestProducts(options) {
  return {
    type: REQUEST_PRODUCTS,
    ...options
  }
}

function receiveProducts(list) {
  return {
    type: RECEIVE_PRODUCTS,
    list
  }
}

function requestProduct(id) {
  return {
    type: REQUEST_PRODUCT,
    id
  }
}

function receiveProduct(user) {
  return {
    type: RECEIVE_PRODUCT,
    user
  }
}

export function fetchProducts({ page = 1, limit = 9, order = '-_id', callback = null, search = null, filter = 'title' }) {
  return (dispatch) => {
    if (!callback) {
      dispatch(requestProducts({ page: page, search: search }))
    }
    request
      .post(api.url('/products'))
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
            dispatch(receiveProducts(list))
          } else {
            callback(res.body)
          }
        }
      })
  }
}

export function fetchProduct(id) {
  return (dispatch) => {
    dispatch(requestProduct(id))
    request
      .post(api.url(`/products/${id}`))
      .send(api.params())
      .set('Accept', 'application/json')
      .end((err, res) => {
        let user = {}
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          user = res.body.data
        }
        dispatch(receiveProduct(user))
      })
  }
}

export function toggleProduct(id, active) {
  return (dispatch) => {
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
            dispatch({ type: TOGGLE_ACTIVE_PRODUCT, id })
          }
        }
      })
  }
}
