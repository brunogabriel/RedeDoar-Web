import { User } from '../../models'

export default (req, res, next) => {
  const access_token = req.query.token || req.body.token
  return User.byAccessToken(access_token).then((user) => {
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
}
