import { Product } from '../../models'
import { productView } from '../../helpers'

export default (req, res, next) => {
  let options = {
    active: true
  }
  return Product.find(options)
    .populate({
      path: 'user',
      select: 'name'
    })
    .sort({ _id: 'desc' })
    .then((products) => {
      products = productView.prepareData(products)
      res.send({
        status: true,
        data: products
      })
    })
}
