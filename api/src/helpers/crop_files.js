import fs from 'fs'
import path from 'path'
import im from 'imagemagick'
import _ from 'lodash'
import { removeFiles } from './'
import Promise from 'bluebird'

const imCrop = Promise.promisify(im.crop)

const cropFiles = (files, config) => {
  try {
    fs.accessSync(config.output)
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.mkdirSync(config.output)
    }
  }

  let items = []
  let promises = []

  files.map((file) => {
    for (let size in config.sizes) {
      let default_options = {
        srcPath: file.path,
        dstPath: config.output + size + '_' + file.filename,
        quality: 0.7,
        format: 'jpg'
      }
      let options = _.assign(default_options, config.sizes[size])
      promises.push(imCrop(options))
    }
    items.push({
      filename: file.filename,
      directory: config.output
    })
  })

  Promise.all(promises).then((err) => {
    removeFiles(files)
  })

  return items
}

export default cropFiles
