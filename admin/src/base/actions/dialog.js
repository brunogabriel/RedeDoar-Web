import {
  SHOW_DIALOG,
  HIDE_DIALOG
} from '../constants'
import { body } from '../../helpers'

export const showDialog = ({ onSuccess, onClose }) => {
  body.addClass('modal-open')
  return {
    type: SHOW_DIALOG,
    onSuccess: onSuccess,
    onClose: onClose
  }
}

export const hideDialog = () => {
  body.removeClass('modal-open')
  return {
    type: HIDE_DIALOG
  }
}
