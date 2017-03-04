import { User } from '../../models'

export default (req, res, next) => {
  User.loginAccount(req.body).then((user) => {
    res.send({
      status: true,
      data: user
    })
  }).catch(next)
}
