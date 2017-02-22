import FB from 'fb'
import { User } from '../../models'
import config from '../../config'

export default (req, res, next) => {
  if (req.query.access_token) {
    User.byAccessToken(req.query.access_token).then((user) => {
      if (user) {
        res.send({
          status: true,
          data: user
        })
      } else {
        res.send({
          status: false,
          message: res.__('Invalid access token')
        })
      }
    }).catch(next)
  } else {
    res.redirect(FB.getLoginUrl({ scope: config.facebook.scope }))
  }
}
