import { Product } from '../../models'

export default (req, res, next) => {
  return Product.find().then((products) => {
    res.send({
      status: true,
      data: products
    })
  })
}
