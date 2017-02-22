import { User } from '../../models'
import { Product } from '../../models'

export default (req, res, next) => {
  User.disable(req.user).save().then((user) => {
    Product.update(
      { user: user.id },
      { active: false },
      { multi: true }
    ).then((raw) => {
      res.send({
        status: true,
        message: res.__('Conta desativada com sucesso'),
      })
    }).catch(next)
  }).catch(next)
}
