import fs from 'fs'

export default {
  remove: function(image) {
    try {
      let loader = `${image.directory}loader_${image.filename}`
      let thumb = `${image.directory}thumb_${image.filename}`
      let large = `${image.directory}large_${image.filename}`
      fs.unlinkSync(loader)
      fs.unlinkSync(thumb)
      fs.unlinkSync(large)
    } catch (e) {
      console.log(e)
    }
  },
  removeDirectory: function(product) {
    if (product.images) {
      let path = product.images[0].directory
      if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file,index) {
          var cur_path = `${path}/${file}`
          if (fs.lstatSync(cur_path).isDirectory()) {
            deleteFolderRecursive(cur_path)
          } else {
            fs.unlinkSync(cur_path)
          }
        })
        fs.rmdirSync(path)
      }
    }
  }
}
