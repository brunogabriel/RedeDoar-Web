import { Product } from '../../models'
import { cropFiles, productView, handleError } from '../../helpers'

export default (req, res, next) => {
  let product = new Product(req.body)
  product.user = req.user.id
  return product.save().then((product) => {
    let options = product.getImageOptions()
    let images = cropFiles(req.files, options)
    let output = {
      status: true,
      message: 'Produto adicionado com sucesso'
    }

    if (images) {
      product.images = images
      product.save((err) => {
        if (err) new Error(err)
        output.data = productView.prepareData(product)
        res.send(output)
      })
    } else {
      output.data = productView.prepareData(product)
      res.send(output)
    }
  }, (err) => {
    next({ message: handleError.getMessage(err) })
  })
}
