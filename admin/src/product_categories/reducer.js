import {
  REQUEST_PRODUCT_CATEGORIES,
  RECEIVE_PRODUCT_CATEGORIES,
  DROP_FILE_PRODUCT_CATEGORIES,
  REQUEST_PRODUCT_CATEGORY,
  RECEIVE_PRODUCT_CATEGORY
} from './constants'

const initialState = {
  list: { data: [], paging: {} },
  sending: false,
  file: null,
  data: {}
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

    case REQUEST_PRODUCT_CATEGORY:
      return Object.assign({}, state, {
        sending: true
      })

    case RECEIVE_PRODUCT_CATEGORY:
      return Object.assign({}, state, {
        sending: false,
        file: null,
        data: action.data
      })

    default:
      return state
  }
}

export default reducer
