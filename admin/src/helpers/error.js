import { NOTIFICATION_ERROR } from '../notifications/constants'

export default {
  handleAjax: (data, res, dispatch) => {
    let message = data.message
    if (res && res.body && res.body.message) {
      message = res.body.message
    }
    if (dispatch) {
      dispatch({
        type: NOTIFICATION_ERROR,
        message_type: 'error',
        plain_message: true,
        message: message
      })
    } else {
      alert(message)
    }
  }
}
