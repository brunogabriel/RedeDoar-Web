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

const successToken = (user) => {
  return {
    type: USER_LOGGED_IN,
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
      .post(api.url('/auth/login'))
      .set('Accept', 'application/json')
      .type('form')
      .send({ username: username, password: password })
      .end((err, res) => {
        if (!err) {
          if (res.body.status) {
            cookie.save('user_token', res.body.data.token, { path: '/' })
            dispatch(successLogin(res.body.data))
            dispatch(push('/'))
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
          .post(api.url('/auth/profile'))
          .set('Accept', 'application/json')
          .type('form')
          .send({ token: token })
          .end((err, res) => {
            if (!err) {
              if (res.body.status) {
                const redirect = url_parser.query('redirect') || '/'
                dispatch(successToken(res.body.data))
                dispatch(push(redirect))
              } else {
                dispatch({ type: CHECKED_SESSION })
              }
            } else {
              dispatch({ type: CHECKED_SESSION })
            }
          })
      }
    }
  }
}

