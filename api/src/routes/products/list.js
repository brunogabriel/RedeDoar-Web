import { Product } from '../../models'
import { productView } from '../../helpers'

export default (req, res, next) => {
  return Product.find().sort({ _id: 'desc' }).then((products) => {
    products = productView.prepareData(products)
    res.send({
      status: true,
      data: products
    })
  })
}
