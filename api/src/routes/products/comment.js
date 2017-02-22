import { Product } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let product = req.product
  let comment = req.body.comment
  product.comments.push({
    comment: comment,
    user: req.user.id
  })
  product.save().then((product) => {
    let comment = product.comments[product.comments.length - 1]
    res.send({
      status: true,
      message: res.__('Comment saved successfully!'),
      data: comment
    })
  }).catch(next)
}
