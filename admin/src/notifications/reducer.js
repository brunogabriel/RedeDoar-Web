import {
  HIDING_NOTIFICATION,
  HIDDEN_NOTIFICATION,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_INFO,
  NOTIFICATION_ERROR,
  NOTIFICATION_WARNING,
  NOTIFICATION_PRIMARY,
  TIME_LEFT_NOTIFICATION,
  TIME_LEFT_CANCELLED_NOTIFICATION
} from './constants'

const initialState = {
  message: null,
  message_type: NOTIFICATION_INFO,
  message_duration: 5000,
  status: 'hidden',
  time_left: 5,
  time_left_cancelled: false,
  plain_message: false
}

function notification(state = initialState, action) {
  switch (action.type) {
    case HIDING_NOTIFICATION:
      return Object.assign({}, state, {
        status: 'hiding'
      })

    case HIDDEN_NOTIFICATION:
      return Object.assign({}, state, {
        status: 'hidden'
      })

    case TIME_LEFT_NOTIFICATION:
      return Object.assign({}, state, {
        time_left: action.time_left
      })

    case TIME_LEFT_CANCELLED_NOTIFICATION:
      return Object.assign({}, state, {
        time_left_cancelled: true
      })
  }
  
  if (action.message) {
    return Object.assign({}, state, {
      message: action.message,
      message_type: (action.message_type || initialState.message_type),
      message_duration: (action.message_duration || initialState.message_duration),
      time_left: (action.message_duration || initialState.message_duration) / 1000,
      status: 'show',
      time_left_cancelled: false,
      plain_message: (action.plain_message || false)
    })
  }

  return state
}

export default notification
