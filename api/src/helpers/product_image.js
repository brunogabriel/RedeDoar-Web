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
  }
}
