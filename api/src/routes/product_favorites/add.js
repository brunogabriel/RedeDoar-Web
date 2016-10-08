import { ProductFavorite } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let product_id = req.body.product_id
  let options = {
    user: req.user.id,
    product: product_id
  }
  ProductFavorite.findOne(options).then((product_favorite) => {
    if (!product_favorite) {
      let product_favorite = new ProductFavorite(options)
      return product_favorite.save().then((product_favorite) => {
        if (product_favorite) {
          res.send({
            status: true,
            message: 'Produto favoritado com sucesso',
            data: product_favorite
          })
        } else {
          res.send({
            status: false,
            message: 'Erro ao adicionar produto aos favoritos'
          })
        }
      })
    } else {
      res.send({
        status: false,
        message: 'Você já adicionou esse produto aos favoritos'
      })
    }
  })
}
