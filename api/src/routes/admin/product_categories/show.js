import { ProductCategory } from '../../../models'
import { pagination, productCategoryView } from '../../../helpers'

export default (req, res, next) => {
  return ProductCategory.findOne({ _id: req.params.product_category_id }).then((data) => {
    res.send({
      status: true,
      data: data
    })
  })
}
