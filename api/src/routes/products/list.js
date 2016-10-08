import { Product } from '../../models'
import { productView } from '../../helpers'

export default (req, res, next) => {
  return Product.find().then((products) => {
    products = productView.prepareData(products)
    res.send({
      status: true,
      data: products
    })
  })
}
