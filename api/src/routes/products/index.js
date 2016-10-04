import express from 'express'
import multer from 'multer'
import hat from 'hat'
import _ from 'lodash'

import { Product } from '../../models'
import list from './list'
import add from './add'
import comment from './comment'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp')
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname
    let extension = originalname.split('.').reverse().shift()
    let filename = hat() + '.' + extension
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {
  if (_.startsWith(file.mimetype, 'image')) {
    cb(null, true)
  } else {
    cb(new Error('Arquivo inválido, precisa ser uma imagem: jpg, png ou gif'))
  }
}

let upload = multer({ storage: storage, fileFilter: fileFilter })

router.post('/', list)
router.post('/add', upload.any(), add)
router.post('/:id/comment', comment)

export default router
