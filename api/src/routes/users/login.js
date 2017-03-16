import { User } from '../../models'

export default (req, res, next) => {
  if (req.body.token) {
    User.loginWithToken(req.body.token).then((user) => {
      res.send(User.dataLoginResponse(user, req))
    }).catch(next)
  } else {
    User.loginAccount(req.body).then((user) => {
      res.send(User.dataLoginResponse(user, req))
    }).catch(next)
  }
}
