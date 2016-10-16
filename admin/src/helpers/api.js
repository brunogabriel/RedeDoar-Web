import cookie from 'react-cookie'
import { env } from './'

export default {
  endpoint: () => {
    const endpoints = {
      development: 'http://rede-doar-api.dev.azk.io',
      staging: 'http://rede-doar-api.dev.azk.io',
      production: 'http://rede-doar-api.dev.azk.io'
    }
    if (env.isProduction()) {
      return endpoints.production
    } else if (env.isStaging()) {
      return endpoints.staging
    }
    return endpoints.development
  },
  url: function(path) {
    return `${this.endpoint()}${path}`
  },
  params: function(params) {
    const token = cookie.load('user_token')
    const default_params = { token: token }
    return Object.assign(default_params, params)
  }
}