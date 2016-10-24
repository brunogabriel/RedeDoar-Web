import { ProductCategory } from '../../../models'
import { asset } from '../../../helpers'

export default (req, res, next) => {
  return ProductCategory.find().then((product_categories) => {
    res.send({
      status: true,
      data: product_categories
    })
  })
}
