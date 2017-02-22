import { User } from '../../models'

export default (req, res, next) => {
  User.createAccount(req.body).then((user) => {
    res.send({
      status: true,
      data: user
    })
  }).catch(next)
}
