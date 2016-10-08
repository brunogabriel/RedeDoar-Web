import { Product } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) new Error(err)
    if (product) {
      let comment = req.body.comment
      if (comment) {
        product.comments.push({
          comment: comment,
          user: req.user.id
        })
        product.save((err) => {
          if (!err) {
            res.send({
              status: true,
              message: 'Comentário salvo com sucesso!'
            })
          } else {
            next({ message: handleError.getMessage(err) })
          }
        })
      } else {
        next()
      }
    } else {
      next({ message: 'Produto não encontrado' })
    }
  })
}
