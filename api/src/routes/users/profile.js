import { User } from '../../models'

export default (req, res, next) => {
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
}
