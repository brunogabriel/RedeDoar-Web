import { ProductFavorite } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let options = {
    user_id: req.user.id
  }
  ProductFavorite.find(options, (err, product_favorites) => {
    if (err) new Error(err)
    res.send({
      status: true,
      message: 'Favoritos resgatados com sucesso',
      data: product_favorites
    })
  })
}
