import google from 'googleapis'
import moment from 'moment'
import config from '../../config'
import { User } from '../../models'
import { normalizeLocale } from '../../helpers'

export default (req, res, next) => {
  const plus = google.plus('v1')
  const OAuth2 = google.auth.OAuth2
  const oauth2Client = new OAuth2(
    config.google.appId,
    config.google.appSecret,
    config.google.redirectUri
  )

  oauth2Client.getToken(req.query.code, (err, tokens) => {
    if (!err) {
      oauth2Client.setCredentials(tokens)
      plus.people.get({
        userId: 'me',
        auth: oauth2Client
      }, (err, result) => {
        if (!err) {
          // res.send({
          //   status: true,
          //   result: result,
          //   tokens: tokens
          // })
          User.byNetworkId(result.id, 'google').then((user) => {
            if (user) {
              let user_data = {
                google: {
                  id: result.id,
                  accessToken: tokens.access_token,
                  expires: tokens.expiry_date,
                  idToken: tokens.id_token,
                }
              }
              user.updateAccount(user_data).then((user) => {
                res.send({
                  status: true,
                  data: user
                })
              }).catch(next)
            } else {
              let email = result.emails.shift().value
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
              User.createAccount(user_data).then((user) => {
                res.send({
                  status: true,
                  data: user
                })
              }).catch(next)
            }
          })
        } else {
          next(err)
        }
      })
    } else {
      next(err)
    }
  })
}
