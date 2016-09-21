import { Product } from '../../models'
import fs from 'fs'
import path from 'path'
import im from 'imagemagick'
import Promise from 'bluebird'
import _ from 'lodash'

const imCrop = Promise.promisify(im.crop)

const removeFiles = (files) => {
  if (files) {
    files.forEach((item) => {
      if (item.path) {
        fs.unlink(item.path)
      }
    })
  }
}

const cropFiles = (files, config) => {
  var items = []
  files.map((file) => {
    for (let size in config.sizes) {
      let default_options = {
        srcPath: file.path,
        dstPath: config.output + size + '_' + file.filename,
        quality: 0.8,
        format: 'jpg'
      }
      items.push(imCrop(_.assign(default_options, config.sizes[size])))
    }
  })
  return Promise.all(items)
}

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
