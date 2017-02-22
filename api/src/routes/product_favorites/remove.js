import { ProductFavorite } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let options = {
    _id: req.params.id,
    user: req.user.id
  }
  ProductFavorite.findOne(options).then((product_favorite) => {
    if (product_favorite) {
      product_favorite.remove().then((product_favorite) => {
        if (product_favorite) {
          res.send({
            status: true,
            message: res.__('Favorite successfully removed')
          })
        } else {
          res.send({
            status: false,
            message: res.__('Error removing product from favorites')
          })
        }
      }).catch(next)
    } else {
      res.send({
        status: false,
        message: res.__('Favorite not found')
      })
    }
  }).catch(next)
}
