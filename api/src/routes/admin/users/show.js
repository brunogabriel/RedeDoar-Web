import { User } from '../../../models'
import { Product } from '../../../models'
import { handleError, productView } from '../../../helpers'

export default (req, res, next) => {
  let fields = 'name gender email picture language active'
  return User.findOne({ _id: req.params.id }, fields).then((user) => {
    let data = user
    return Product.find({ user: user._id })
      .populate('category', 'name')
      .populate('to_user', 'name')
      .sort({ _id: 'desc' })
      .then((products) => {
        products = productView.prepareData(products)
        data.set('products', products, { strict: false })
        data.set('products_count', products.length, { strict: false })
        res.send({
          status: true,
          data: data
        })
      })
  }, (err) => {
    next({ message: handleError.getMessage(err) })
  })
}
