import {
  SENDING_LOGIN,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  CHECKING_SESSION,
  CHECKED_SESSION,
  ERROR_LOGIN
} from '../constants'

import { push } from 'react-router-redux'
import request from 'superagent'
import cookie from 'react-cookie'
import { api, url_parser } from '../../helpers'

const sendingLogin = () => {
  return {
    type: SENDING_LOGIN,
    message: 'auth.sending_login',
    message_type: 'info'
  }
}

const successLogin = (user) => {
  return {
    type: USER_LOGGED_IN,
    message: 'auth.user_logged_in',
    message_type: 'success',
    user: user
  }
}

const errorLogin = () => {
  return {
    type: ERROR_LOGIN,
    message: 'auth.error_login',
    message_type: 'danger'
  }
}

export const logout = () => {
  cookie.remove('user_token', { path: '/' })
  return {
    type: USER_LOGGED_OUT
  }
}

export function submitLogin({ username, password }) {
  return dispatch => {
    dispatch(sendingLogin())
    request
      .post(api.url('/users/login'))
      .set('Accept', 'application/json')
      .type('form')
      .send({ email: username, password: password })
      .end((err, res) => {
        if (!err) {
          if (res.body.result == 'success') {
            cookie.save('user_token', res.body.data.token, { path: '/' });
            dispatch(successLogin(res.body.data))
            dispatch(push('/dashboard'))
          } else {
            dispatch(errorLogin())
          }
        } else {
          dispatch(errorLogin())
        }
      })
  }
}

let checked_session = false

export function checkSession() {
  return (dispatch, getState) => {
    if (!checked_session) {
      checked_session = true
      const token = cookie.load('user_token')

      if (token) {
        dispatch({ type: CHECKING_SESSION })
        request
          .get(api.url('/users/profile'))
          .set('Accept', 'application/json')
          .type('form')
          .query({ token: token })
          .end((err, res) => {
            if (!err) {
              if (res.body.result == 'success') {
                const redirect = url_parser.query('redirect') || '/dashboard'
                dispatch(successLogin(res.body.data))
                dispatch(push(redirect))
              }
            } else {
              dispatch({ type: CHECKED_SESSION })
            }
          })
      }
    }
  }
}

