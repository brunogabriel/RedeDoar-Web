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
      product_favorite.save().then((product_favorite) => {
        if (product_favorite) {
          res.send({
            status: true,
            message: res.__('Donation saves to favorites'),
            data: product_favorite
          })
        } else {
          res.send({
            status: false,
            message: res.__('Erro to add donation in favorites')
          })
        }
      }).catch(next)
    } else {
      res.send({
        status: false,
        message: res.__('You have already added this to the favorites')
      })
    }
  }).catch(next)
}
