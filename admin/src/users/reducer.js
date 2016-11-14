import {
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_USER,
  RECEIVE_USER,
  TOGGLE_ACTIVE_USER,
  TOGGLE_ACTIVE_PRODUCT
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
    case REQUEST_USERS:
      return Object.assign({}, state, {
        data: {},
        sending: true,
        search: action.search
      })

    case REQUEST_USER:
      return Object.assign({}, state, {
        list: { data: [], paging: {} },
        data: {},
        sending: true
      })

    case RECEIVE_USERS:
      return Object.assign({}, state, {
        list: action.list,
        sending: false
      })

    case RECEIVE_USER:
      return Object.assign({}, state, {
        data: action.user,
        sending: false
      })

    case TOGGLE_ACTIVE_USER:
      data = Object.assign({}, state.data)
      list = Object.assign({}, state.list)
      if (data._id == action.id) data.active = !data.active
      list.data.forEach((item) => {
        if (item._id == action.id) {
          item.active = !item.active
        }
      })
      return Object.assign({}, state, {
        data: data,
        list: list
      })

    case TOGGLE_ACTIVE_PRODUCT:
      data = Object.assign({}, state.data)
      data.products.forEach((item) => {
        if (item._id == action.id) {
          item.active = !item.active
        }
      })
      return Object.assign({}, state, {
        data: data
      })

    default:
      return state
  }
}

export default reducer
