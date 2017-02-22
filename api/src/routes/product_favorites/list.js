import { ProductFavorite } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let options = {
    user: req.user.id
  }
  ProductFavorite.find(options).then((product_favorites) => {
    res.send({
      status: true,
      message: res.__('Listed favorites'),
      data: product_favorites
    })
  }).catch(next)
}
