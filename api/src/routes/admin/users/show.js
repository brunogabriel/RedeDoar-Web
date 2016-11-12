import { User } from '../../../models'
import { Product } from '../../../models'

export default (req, res, next) => {
  let fields = 'name gender email picture language active'
  return User.findOne({ _id: req.params.id }, fields).then((user) => {
    let data = user
    return Product.find({ user: user._id })
      .sort({ _id: 'desc' })
      .then((products) => {
        data.set('products', products, { strict: false })
        res.send({
          status: true,
          data: data
        })
      })
  })
}
