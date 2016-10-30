import request from 'superagent'
import { api, error } from '../../helpers'
import {
  RECEIVE_PRODUCT_CATEGORIES,
  REQUEST_PRODUCT_CATEGORIES
} from '../constants'

function requestProductCategories(options) {
  return {
    type: REQUEST_PRODUCT_CATEGORIES,
    ...options
  }
}

function receiveProductCategories(list) {
  return {
    type: RECEIVE_PRODUCT_CATEGORIES,
    list
  }
}

export function fetchProductCategories({ page = 1, limit = 10, order = '-id', callback = null, search = null, filter = 'name' }) {
  return (dispatch) => {
    if (!callback) {
      dispatch(requestProductCategories({ page: page, search: search }))
    }
    request
      .post(api.url('/product_categories'))
      .send(api.params({
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
            dispatch(receiveProductCategories(list))
          } else {
            callback(res.body)
          }
        }
      })
  }
}
