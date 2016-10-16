import {
  HIDING_NOTIFICATION,
  HIDDEN_NOTIFICATION,
  TIME_LEFT_NOTIFICATION,
  TIME_LEFT_CANCELLED_NOTIFICATION
} from '../constants'

let hiddenTimeOut
let lastTimeInterval
let time_left

export const hideNotification = () => {
  return dispatch => {
    dispatch({ type: HIDING_NOTIFICATION })
    clearTimeout(hiddenTimeOut)
    hiddenTimeOut = window.setTimeout(() => {
      dispatch({ type: HIDDEN_NOTIFICATION })
    }, 500)
  }
}

export const hideTimeOutNotification = (notification) => {
  const timeoutTime = notification.message_duration
  return dispatch => {
    if (notification && notification.status == 'show') {
      clearInterval(lastTimeInterval)
      time_left = notification.time_left
      lastTimeInterval = window.setInterval(() => {
        if (!notification.time_left_cancelled) {
          --time_left
          dispatch({ type: TIME_LEFT_NOTIFICATION, time_left })
          if (time_left == 0) {
            clearInterval(lastTimeInterval)
            dispatch(hideNotification())
          }
        } else {
          clearTimeout(hiddenTimeOut)
          clearInterval(lastTimeInterval)
        }
      }, 1000)
    }
  }
}

export const cancelTimeOutNotification = () => {
  return dispatch => {
    dispatch({ type: TIME_LEFT_CANCELLED_NOTIFICATION })
  }
}
