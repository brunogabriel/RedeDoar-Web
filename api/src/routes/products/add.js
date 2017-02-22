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
      message: res.__('Donation was saved!')
    }

    if (images && images.length > 0) {
      product.images = images
      product.save((err) => {
        if (err) new Error(err)
        output.data = productView.prepareData(product)
        res.send(output)
      })
    } else {
      product.remove()
      output.status = false
      output.message = res.__('You must send at least 1 photo.')
      res.send(output)
    }
  }).catch(next)
}
