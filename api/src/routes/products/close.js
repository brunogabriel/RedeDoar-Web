import { Product } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let options = { runValidators: true }
  let data = { active: false, state: req.body.state }
  if (req.body.to_user) data.to_user = req.body.to_user

  Product.update({ _id: req.product.id }, data, options).then((product) => {
    res.send({
      status: true,
      message: res.__('Your donation was successfully closed!')
    })
  }).catch(next)
}
