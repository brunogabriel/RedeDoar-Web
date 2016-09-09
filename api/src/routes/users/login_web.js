import FB from 'fb'
import { User } from '../../models'
import config from '../../config'

export default (req, res, next) => {
  if (req.query.access_token) {
    return User.byAccessToken(req.query.access_token).then((user) => {
      if (user) {
        res.send({
          status: true,
          data: user
        })
      } else {
        res.send({
          status: false,
          message: 'Access token inválido'
        })
      }
    })
  } else {
    res.send({
      status: true,
      login_url: FB.getLoginUrl({ scope: config.facebook.scope })
    })
  }
}
