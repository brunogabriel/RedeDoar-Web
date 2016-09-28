import { Product } from '../../models'
import { cropFiles, removeFiles } from '../../helpers'

export default (req, res, next) => {
  if (true) {
    let options = {
      output: 'public/uploads/products/',
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
    cropFiles(req.files, options).then((files) => {
      removeFiles(req.files)
      res.send({
        status: true,
        message: 'Upload feito com sucesso',
        options: options
      })
    })

    // console.log(req.files[0])
    // let options = {
    //   srcPath: req.files[0].path,
    //   dstPath: 'public/uploads/' + req.files[0].filename,
    //   quality: 0.8,
    //   format: 'jpg',
    //   width: 200,
    //   height: 200
    // }
    // im.crop(options, (err, stdout, stderr) => {
    //   removeFiles(req.files)
    //   if (err) return next(err)
    //   console.log(err, stdout, stderr)
    //   res.send({
    //     status: true,
    //     message: 'Upload feito com sucesso',
    //     files: stdout
    //   })
    // })
  } else {
    removeFiles(req.files)
    res.send({
      status: false,
      message: 'Erro ao cadastrar'
    })
  }

  // return Product.find().then((products) => {
  //   res.send({
  //     status: true,
  //     data: products,
  //     // files: req.files
  //   })
  // })
}
