import {
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_USER,
  RECEIVE_USER
} from './constants'

const initialState = {
  list: { data: [], paging: {} },
  sending: false,
  data: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        data: {},
        sending: true
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

    default:
      return state
  }
}

export default reducer
