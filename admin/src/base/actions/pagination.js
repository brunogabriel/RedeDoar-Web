import _ from 'lodash'
import { SET_PAGINATION } from '../constants'

export const setPagination = (options) => {
  return {
    type: SET_PAGINATION,
    options
  }
}

export const checkPaginationParams = (query) => {
  return dispatch => {
    const accept = ['page', 'page_count', 'limit', 'sort']
    const options = _.pick(query, accept)
    if (!_.isEmpty(options)) {
      dispatch(setPagination(options))
    }
  }
}

export const getPage = (query, fallback) => {
  return query.page || fallback
}
