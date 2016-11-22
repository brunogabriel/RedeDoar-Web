import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  REQUEST_PRODUCT,
  RECEIVE_PRODUCT,
  TOGGLE_ACTIVE_PRODUCT,
  ENABLE_PRODUCT_SENDING
} from './constants'

const initialState = {
  list: { data: [], paging: {} },
  sending: false,
  data: {},
  search: null
}

function reducer(state = initialState, action) {
  let data, list

  switch (action.type) {
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        data: {},
        sending: true,
        search: action.search
      })

    case REQUEST_PRODUCT:
      return Object.assign({}, state, {
        list: { data: [], paging: {} },
        data: {},
        sending: true
      })

    case RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        list: action.list,
        sending: false
      })

    case RECEIVE_PRODUCT:
      return Object.assign({}, state, {
        data: action.user,
        sending: false
      })

    case TOGGLE_ACTIVE_PRODUCT:
      data = Object.assign({}, state.data)
      list = Object.assign({}, state.list)
      if (data._id == action.id) data.active = !data.active
      list.data.forEach((item) => {
        if (item._id == action.id) {
          item.active = !item.active
        }
      })
      return Object.assign({}, state, {
        sending: false,
        data: data,
        list: list
      })

    case ENABLE_PRODUCT_SENDING:
      return Object.assign({}, state, {
        sending: true
      })

    default:
      return state
  }
}

export default reducer
