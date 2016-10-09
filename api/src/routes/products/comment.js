import { Product } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let product = req.product
  let comment = req.body.comment
  if (comment) {
    product.comments.push({
      comment: comment,
      user: req.user.id
    })
    product.save((err) => {
      if (!err) {
        let comment = product.comments[product.comments.length - 1]
        res.send({
          status: true,
          message: 'Comentário salvo com sucesso!',
          data: comment
        })
      } else {
        next({ message: handleError.getMessage(err) })
      }
    })
  } else {
    next()
  }
}
