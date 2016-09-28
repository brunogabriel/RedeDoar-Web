import fs from 'fs'
import path from 'path'

const removeFiles = (files) => {
  if (files) {
    files.forEach((item) => {
      if (item.path) {
        fs.unlink(item.path)
      }
    })
  }
}

export default removeFiles
