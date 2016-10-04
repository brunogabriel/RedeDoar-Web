import { Product } from '../../models'
import { cropFiles } from '../../helpers'

export default (req, res, next) => {
  if (true) {
    let product = new Product(req.body)
    return product.save().then((product) => {
      let options = {
        output: 'public/uploads/products/' + product.id + '/',
        sizes: {
          thumb: {
            width: 100,
            height: 100
          },
          loader: {
            width: 100,
            height: 100,
            quality: 0.1
          },
          large: {
            width: 800,
            height: 800
          }
        }
      }
      let images = cropFiles(req.files, options)
      let output = {
        status: true,
        message: 'Upload feito com sucesso'
      }

      if (images) {
        product.images = images
        product.save((err) => {
          if (err) new Error(err)
          res.send(output)
        })
      } else {
        res.send(output)
      }
    })
  } else {
    removeFiles(req.files)
    res.send({
      status: false,
      message: 'Erro ao cadastrar'
    })
  }
}
