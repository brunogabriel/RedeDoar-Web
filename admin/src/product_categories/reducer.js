import {
  RECEIVE_PRODUCT_CATEGORIES,
  REQUEST_PRODUCT_CATEGORIES
} from './constants'

const initialState = {
  list: { data: [], paging: {} }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PRODUCT_CATEGORIES: 
      return Object.assign({}, state, {
        list: action.list
      })
    default:
      return state
  }
}

export default reducer
