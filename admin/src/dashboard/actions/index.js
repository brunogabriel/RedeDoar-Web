import request from 'superagent'
import { api, error } from '../../helpers'
import {
  REQUEST_STATS,
  RECEIVE_STATS
} from '../constants'

function requestStats(options) {
  return {
    type: REQUEST_STATS,
    ...options
  }
}

function receiveStats(stats) {
  return {
    type: RECEIVE_STATS,
    stats
  }
}

export function fetchStats() {
  return (dispatch) => {
    dispatch(requestStats())
    request
      .post(api.url(`/dashboard/stats`))
      .send(api.params())
      .set('Accept', 'application/json')
      .end((err, res) => {
        let stats = {}
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          stats = res.body.data
        }
        dispatch(receiveStats(stats))
      })
  }
}
