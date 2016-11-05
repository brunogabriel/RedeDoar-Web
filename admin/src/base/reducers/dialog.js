import {
  SHOW_DIALOG,
  HIDE_DIALOG
} from '../constants'

let initialState = {
  show: false,
  onSuccess: null
}

const dialog = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return Object.assign({}, state, {
        show: true,
        onSuccess: action.onSuccess,
        onClose: action.onClose
      })

    case HIDE_DIALOG:
      return Object.assign({}, state, {
        show: false
      })

    default:
      return state
  }
}

export default dialog
