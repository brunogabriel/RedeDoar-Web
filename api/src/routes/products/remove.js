import fs from 'fs'
import { ProductFavorite } from '../../models'
import { handleError, productImage } from '../../helpers'

export default (req, res, next) => {
  let product = req.product
  return product.remove().then((product) => {
    if (product) {
      productImage.removeDirectory(product)
      res.send({
        status: true,
        message: 'Produto removido com sucesso'
      })
    } else {
      res.send({
        status: false,
        message: 'Erro ao remover produto'
      })
    }
  })
}
