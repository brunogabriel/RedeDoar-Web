import { User } from '../../../models'
import { Product } from '../../../models'
import { handleError } from '../../../helpers'

export default (req, res, next) => {
  const condition = { _id: req.params.id }
  const params = { active: req.body.active }
  return User.update(condition, params).then((user) => {
    return Product.update(
      { user: req.params.id, state: null },
      { active: req.body.active },
      { multi: true },
    ).then((products) => {
      res.send({
        status: true,
        data: {
          user: user,
          products: products
        }
      })
    })
  }, (err) => {
    next({ message: handleError.getMessage(err) })
  })
}
