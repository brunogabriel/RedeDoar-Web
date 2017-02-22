import { Product } from '../../models'
import { cropFiles, productImage, productView, handleError } from '../../helpers'

export default (req, res, next) => {
  let product = req.product
  return product.patchEntity(req.body).save().then((product) => {
    let options = product.getImageOptions()
    let images = cropFiles(req.files, options)
    let output = {
      status: true,
      message: res.__('Donation changed successfully')
    }

    if (images.length > 0) {
      for (let i in images) {
        if (product.images[i]) {
          productImage.remove(product.images[i])
        }
      }
      product.images = images
      product.save().then((product) => {
        output.data = productView.prepareData(product)
        res.send(output)
      }).catch(next)
    } else {
      output.data = productView.prepareData(product)
      res.send(output)
    }
  }).catch(next)
}
