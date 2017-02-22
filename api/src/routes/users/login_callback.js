import FB from 'fb'
import Step from 'step'
import { User } from '../../models'
import config from '../../config'

export default (req, res, next) => {
  let code = req.query.code

  if (req.query.error) {
    res.send({ status: false, error: req.query.error })
  } else if (!code) {
    res.send({ status: false, error: 'Invalid code' })
  }

  Step(
    function exchangeCodeForAccessToken() {
      FB.napi('oauth/access_token', {
        client_id: FB.options('appId'),
        client_secret: FB.options('appSecret'),
        redirect_uri: FB.options('redirectUri'),
        code: code
      }, this)
    },
    function extendAccessToken(err, result) {
      if (err) return next(err)

      FB.napi('oauth/access_token', {
        client_id: FB.options('appId'),
        client_secret: FB.options('appSecret'),
        grant_type: 'fb_exchange_token',
        fb_exchange_token: result.access_token
      }, this)
    },
    function getMe(err, result) {
      if (err) return next(err)

      let access_token = result.access_token
      let expires = result.expires || 0
      let parameters = {
        access_token: result.access_token,
        fields: config.facebook.fields
      }

      FB.api('/me/', 'get', parameters, (result) => {
        User.hasFacebookId(result.id).then((user) => {
          let user_data = {
            name: result.name,
            email: result.email,
            gender: result.gender,
            birthday: result.birthday,
            facebook: {
              id: result.id,
              accessToken: access_token,
              expires: Date.now() + expires
            }
          }
          if (!user) {
            User.createAccount(user_data).then((user) => {
              res.send({
                status: true,
                access_token: access_token,
                expires: expires,
                new_account: true,
                data: user
              })
            }).catch(next)
          } else {
            user.update(user_data).then((data) => {
              res.send({
                status: true,
                access_token: access_token,
                expires: expires,
                new_account: false,
                data: user,
                update: data
              })
            }).catch(next)
          }
        })
      })
    }
  )
}
