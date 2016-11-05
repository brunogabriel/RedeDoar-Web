import { ProductFavorite } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let options = {
    user: req.user.id
  }
  return ProductFavorite.find(options).then((product_favorites) => {
    res.send({
      status: true,
      message: 'Favoritos resgatados com sucesso',
      data: product_favorites
    })
  })
}
