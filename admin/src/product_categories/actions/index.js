import request from 'superagent'
import { push } from 'react-router-redux'
import { api, error } from '../../helpers'
import {
  REQUEST_PRODUCT_CATEGORIES,
  RECEIVE_PRODUCT_CATEGORIES,
  DROP_FILE_PRODUCT_CATEGORIES,
  REQUEST_PRODUCT_CATEGORY,
  RECEIVE_PRODUCT_CATEGORY
} from '../constants'

function requestProductCategories(options) {
  return {
    type: REQUEST_PRODUCT_CATEGORIES,
    ...options
  }
}

function requestProductCategory(id) {
  return {
    type: REQUEST_PRODUCT_CATEGORY,
    id
  }
}

function requestCreateProductCategory() {
  return {
    type: REQUEST_PRODUCT_CATEGORY
  }
}

function receiveProductCategories(list) {
  return {
    type: RECEIVE_PRODUCT_CATEGORIES,
    list
  }
}

function receiveProductCategory(data) {
  return {
    type: RECEIVE_PRODUCT_CATEGORY,
    data
  }
}

function receiveCreateProductCategory(options) {
  return {
    type: RECEIVE_PRODUCT_CATEGORY,
    ...options
  }
}

export function fetchProductCategories({ page = 1, limit = 10, order = '-_id', callback = null, search = null, filter = 'name' }) {
  return (dispatch) => {
    if (!callback) {
      dispatch(requestProductCategories({ page: page, search: search }))
    }
    request
      .post(api.url('/product_categories'))
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
            dispatch(receiveProductCategories(list))
          } else {
            callback(res.body)
          }
        }
      })
  }
}

export function dropFile(file) {
  return {
    type: DROP_FILE_PRODUCT_CATEGORIES,
    file
  }
}

export function createProductCategory(data) {
  return (dispatch) => {
    dispatch(requestCreateProductCategory())
    let post_data = api.params({ name: data.name })
    let req = request
      .post(api.url('/product_categories/add'))
    for (let i in post_data) {
      req.field(i, post_data[i])
    }
    if (data.image) req.attach('image', data.image)
    req
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          if (res.body.status) {
            dispatch(push('/product_categories'))
          } else {
            alert('error')
          }
          dispatch(receiveCreateProductCategory({
            message: res.body.message,
            plain_message: true
          }))
        }
      })
  }
}

export function fetchProductCategory(id) {
  return (dispatch) => {
    dispatch(requestProductCategory(id))
    request
      .post(api.url(`/product_categories/${id}`))
      .query(api.params())
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          if (res.body.status) {
            dispatch(receiveProductCategory(res.body.data))
          } else {
            // error
          }
        }
      })
  }
}

export function updateProductCategory(id, data) {
  return (dispatch) => {
    dispatch(requestCreateProductCategory())
    let post_data = api.params({ name: data.name })
    let req = request
      .post(api.url(`/product_categories/${id}/edit`))
    for (let i in post_data) {
      req.field(i, post_data[i])
    }
    if (data.image) req.attach('image', data.image)
    req
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          if (res.body.status) {
            dispatch(push('/product_categories'))
          } else {
            alert('error')
          }
          dispatch(receiveCreateProductCategory({
            message: res.body.message,
            plain_message: true
          }))
        }
      })
  }
}

export function deleteProductCategory(id) {
  return (dispatch) => {
    dispatch(requestCreateProductCategory())
    let req = request
      .post(api.url(`/product_categories/${id}/remove`))
      .send(api.params())
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          if (res.body.status) {
            dispatch(fetchProductCategories({ page: 1 }))
          } else {
            alert('error')
          }
          dispatch(receiveCreateProductCategory({
            message: res.body.message,
            plain_message: true
          }))
        }
      })
  }
}
