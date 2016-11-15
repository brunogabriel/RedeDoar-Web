import {
  REQUEST_STATS,
  RECEIVE_STATS
} from './constants'

const initialState = {
  stats: {},
  sending: false
}

function reducer(state = initialState, action) {
  let data, list

  switch (action.type) {
    case REQUEST_STATS:
      return Object.assign({}, state, {
        stats: {},
        sending: true
      })

    case RECEIVE_STATS:
      return Object.assign({}, state, {
        stats: action.stats,
        sending: false
      })

    default:
      return state
  }
}

export default reducer
