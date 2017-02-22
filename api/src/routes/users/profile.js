import { User } from '../../models'

export default (req, res, next) => {
  res.send({
    status: true,
    message: res.__('Profile found'),
    data: req.user
  })
}
