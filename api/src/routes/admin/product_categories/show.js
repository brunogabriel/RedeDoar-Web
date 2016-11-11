import { ProductCategory } from '../../../models'
import { productCategoryView } from '../../../helpers'

export default (req, res, next) => {
  return ProductCategory.findOne({ _id: req.params.product_category_id }).then((product_category) => {
    const data = productCategoryView.prepareData(product_category)
    res.send({
      status: true,
      data: data
    })
  })
}
