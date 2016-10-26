import { ProductCategory } from '../../../models'
import { pagination, productCategoryView } from '../../../helpers'

export default (req, res, next) => {
  return pagination.paginate(ProductCategory, req).then((result) => {
    const data = productCategoryView.prepareData(result.data)
    res.send({
      status: true,
      data: data,
      paging: result.paging
    })
  })
}
