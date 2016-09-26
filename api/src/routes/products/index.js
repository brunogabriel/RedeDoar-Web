import express from 'express'
import multer from 'multer'
import hat from 'hat'

import { Product } from '../../models'
import list from './list'
import add from './add'

const router = express.Router()
// let upload = multer({ dest: 'tmp' })

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp')
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname
    let extension = originalname.split('.').reverse().shift()
    let filename = hat() + '.' + extension
    console.log(extension);
    // https://www.npmjs.com/package/mime-types
    if (extension != 'jpg') {
      cb('Arquivo inválido')
    } else {
      cb(null, filename)
    }
  }
})
let upload = multer({ storage: storage })

router.post('/', list)
router.post('/add', upload.any(), add)

export default router
