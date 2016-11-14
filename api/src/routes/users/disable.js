import { User } from '../../models'
import { Product } from '../../models'

export default (req, res, next) => {
  return User.disable(req.user).save().then((user) => {
    return Product.update(
      { user: user.id },
      { active: false },
      { multi: true }
    ).then((raw) => {
      res.send({
        status: true,
        message: 'Conta desativada com sucesso',
      })
    })
  })
}
