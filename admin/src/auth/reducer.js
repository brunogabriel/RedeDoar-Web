import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  CHECKING_SESSION,
  CHECKED_SESSION,
  SENDING_LOGIN,
  ERROR_LOGIN
} from './constants'

let initialState = {
  user: {},
  checking_session: false,
  sending: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return Object.assign({}, state, {
        user: action.user,
        checking_session: false,
        sending: false
      })

    case USER_LOGGED_OUT:
      return Object.assign({}, state, {
        user: {},
        checking_session: false
      })

    case CHECKING_SESSION:
      return Object.assign({}, state, {
        user: {},
        checking_session: true
      })

    case CHECKED_SESSION:
      return Object.assign({}, state, {
        user: {},
        checking_session: false
      })

    case SENDING_LOGIN:
      return Object.assign({}, state, {
        sending: true
      })

    case ERROR_LOGIN:
      return Object.assign({}, state, {
        sending: false
      })
    
    default:
      return state
  }
}

export default auth
