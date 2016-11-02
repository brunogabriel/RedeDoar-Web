import {
  RECEIVE_PRODUCT_CATEGORIES,
  REQUEST_PRODUCT_CATEGORIES,
  DROP_FILE_PRODUCT_CATEGORIES
} from './constants'

const initialState = {
  list: { data: [], paging: {} },
  sending: false,
  file: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PRODUCT_CATEGORIES: 
      return Object.assign({}, state, {
        list: action.list
      })
    case DROP_FILE_PRODUCT_CATEGORIES: 
      return Object.assign({}, state, {
        file: action.file
      })
    default:
      return state
  }
}

export default reducer
