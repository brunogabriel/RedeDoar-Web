import { Product } from '../../../models'
import { pagination } from '../../../helpers'
import { handleError, productView } from '../../../helpers'

export default (req, res, next) => {
  return Product.findById(req.params.id)
    .populate('user', 'name active')
    .populate('category', 'name')
    .populate('to_user', 'name')
    .then((product) => {
      product = productView.prepareData(product)
      res.send({
        status: true,
        data: product
      })
    }, (err) => {
      next({ message: handleError.getMessage(err) })
    })
}
