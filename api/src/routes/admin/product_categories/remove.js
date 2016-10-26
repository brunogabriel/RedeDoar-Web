import { ProductCategory } from '../../../models'
import { productCategoryImage } from '../../../helpers'

export default (req, res, next) => {
  let product_category = req.product_category
  return product_category.remove().then((product_category) => {
    if (product_category) {
      productCategoryImage.removeDirectory(product_category)
      res.send({
        status: true,
        message: 'Categoria removida com sucesso'
      })
    } else {
      res.send({
        status: false,
        message: 'Erro ao remover categoria'
      })
    }
  })
}
