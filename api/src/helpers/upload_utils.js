import hat from 'hat'
import _ from 'lodash'

export default {
  fileFilterImage: (req, file, cb) => {
    if (_.startsWith(file.mimetype, 'image')) {
      cb(null, true)
    } else {
      cb(new Error('Arquivo inválido, precisa ser uma imagem: jpg, png ou gif'))
    }
  },
  diskStorageDefault: {
    destination: function (req, file, cb) {
      cb(null, 'tmp')
    },
    filename: function (req, file, cb) {
      let originalname = file.originalname
      let extension = originalname.split('.').reverse().shift()
      let filename = hat() + '.' + extension
      cb(null, filename)
    }
  }
}
