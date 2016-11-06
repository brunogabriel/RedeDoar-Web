import { ProductCategory } from '../../models'
import { productCategoryView } from '../../helpers'

export default (req, res, next) => {
  return ProductCategory.find().sort({ name: 'asc' }).then((product_categories) => {
    const data = productCategoryView.prepareData(product_categories)
    res.send({
      status: true,
      data: data
    })
  })
}
