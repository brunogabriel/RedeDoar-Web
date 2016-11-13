import { Product } from '../../models'
import { productView } from '../../helpers'

export default (req, res, next) => {
  return Product.findById(req.params.product_id)
    .populate('user', 'name')
    .populate('category', 'name')
    .then((product) => {
      product = productView.prepareData(product)
      res.send({
        status: true,
        data: product
      })
    })
}
