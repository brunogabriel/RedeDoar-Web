import { Product } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let options = { runValidators: true }
  let data = { active: false, state: req.body.state }
  if (req.body.to_user) data.to_user = req.body.to_user

  return Product.update({ _id: req.product.id }, data, options, function(err, raw) {
    if (err) return next({ message: handleError.getMessage(err) })
    res.send({
      status: true,
      message: 'Sua doação foi fechada com sucesso!'
    })
  })
}
