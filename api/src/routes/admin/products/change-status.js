import { Product } from '../../../models'
import { handleError } from '../../../helpers'

export default (req, res, next) => {
  const condition = { _id: req.params.id }
  const params = { active: req.body.active }
  return Product.update(
    { _id: req.params.id, state: null },
    { active: req.body.active },
    { multi: true },
  ).then((products) => {
    res.send({
      status: true,
      data: products
    })
  }, (err) => {
    next({ message: handleError.getMessage(err) })
  })
}
