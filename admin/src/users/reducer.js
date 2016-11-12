import {
  REQUEST_USERS,
  RECEIVE_USERS
} from './constants'

const initialState = {
  list: { data: [], paging: {} },
  sending: false,
  data: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        sending: true
      })

    case RECEIVE_USERS:
      return Object.assign({}, state, {
        list: action.list
      })

    default:
      return state
  }
}

export default reducer
