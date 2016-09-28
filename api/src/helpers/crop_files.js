import path from 'path'
import im from 'imagemagick'
import Promise from 'bluebird'
import _ from 'lodash'

const imCrop = Promise.promisify(im.crop)

const cropFiles = (files, config) => {
  var items = []
  files.map((file) => {
    for (let size in config.sizes) {
      let default_options = {
        srcPath: file.path,
        dstPath: config.output + size + '_' + file.filename,
        quality: 0.7,
        format: 'jpg'
      }
      items.push(imCrop(_.assign(default_options, config.sizes[size])))
    }
  })
  return Promise.all(items)
}

export default cropFiles
