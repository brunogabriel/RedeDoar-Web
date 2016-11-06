import { Product } from '../../models'
import { cropFiles, productImage, productView, handleError } from '../../helpers'

export default (req, res, next) => {
  let product = req.product
  return product.patchEntity(req.body).save().then((product) => {
    let options = product.getImageOptions()
    let images = cropFiles(req.files, options)
    let output = {
      status: true,
      message: 'Produto alterado com sucesso'
    }

    if (images.length > 0) {
      for (let i in images) {
        if (product.images[i]) {
          productImage.remove(product.images[i])
        }
      }
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
