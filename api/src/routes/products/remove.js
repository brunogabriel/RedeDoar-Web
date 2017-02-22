import { productImage } from '../../helpers'

export default (req, res, next) => {
  let product = req.product
  return product.remove().then((product) => {
    productImage.removeDirectory(product)
    res.send({
      status: true,
      message: res.__('Donation was removed')
    })
  }).catch(next)
}
