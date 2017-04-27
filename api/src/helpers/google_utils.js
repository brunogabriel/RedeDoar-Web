import Promise from 'bluebird'
import google from 'googleapis'
import moment from 'moment'
import config from '../config'
import { User } from '../models'
import { normalizeLocale } from './'

export default {
  getClient () {
    const oauth2Client = new google.auth.OAuth2(
      config.google.appId,
      config.google.appSecret,
      config.google.redirectUri
    )
    return oauth2Client
  },
  getPeople (oauth2Client) {
    return new Promise((resolve, reject) => {
      const plus = google.plus('v1')
      plus.people.get({
        userId: 'me',
        auth: oauth2Client
      }, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  formatUserData (result, tokens) {
    let email = result.emails[0].value
    let birthday = result.birthday
    let user_data = {
      name: result.displayName,
      email: email,
      gender: result.gender,
      picture: result.image.url,
      language: normalizeLocale(result.language),
      google: {
        id: result.id,
        accessToken: tokens.access_token,
        expires: moment(tokens.expiry_date),
        idToken: tokens.id_token,
      }
    }
    if (birthday) user_data.birthday = moment(birthday)
    return user_data
  },
  onLogin (result, tokens) {
    return User.byNetworkId(result.id, 'google').then((user) => {
      let user_data = this.formatUserData(result, tokens)
      if (user) {
        let user_data_update = {
          google: user_data.google
        }
        return user.updateAccount(user_data_update)
      } else {
        return User.createAccount(user_data)
      }
    })
  }
}
