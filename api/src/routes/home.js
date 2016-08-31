import FB from 'fb'
import config from '../config'
import Step from 'step'

FB.options({
  appId: config.facebook.appId,
  appSecret: config.facebook.appSecret,
  redirectUri: config.facebook.redirectUri
});

const home = {
  index: (req, res, next) => {
    if (req.params.access_token) {
      res.send({
        status: true,
        access_token: req.query.access_token,
        expires: req.query.expires
      })
    } else {
      res.send({
        status: true,
        login_url: FB.getLoginUrl({ scope: 'user_about_me' })
      })
    }
  },
  loginCallback: (req, res, next) => {
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
        if (err) throw(err)
        FB.napi('oauth/access_token', {
          client_id: FB.options('appId'),
          client_secret: FB.options('appSecret'),
          grant_type: 'fb_exchange_token',
          fb_exchange_token: result.access_token
        }, this)
      },
      function (err, result) {
        if (err) return next(err)

        let access_token = result.access_token
        let expires = result.expires || 0
        
        return res.send({ status: true, access_token: access_token, expires: expires })
      }
    )
  },
  me: (req, res, next) => {
    let parameters = { access_token: req.query.access_token }
    FB.api('/me/', 'get', parameters , (result) => {
      res.send({ status: true, me: result })
    })
  }
}

export default home
