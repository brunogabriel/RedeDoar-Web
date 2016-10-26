import express from 'express'
import multer from 'multer'

import { ProductCategory } from '../../../models'
import { uploadUtils } from '../../../helpers'
import { adminAuthenticated, validProductCategory } from '../../filters'
import list from './list'
import add from './add'
import edit from './edit'
import remove from './remove'

const router = express.Router()

const storage = multer.diskStorage(uploadUtils.diskStorageDefault)
const upload = multer({ storage: storage, fileFilter: uploadUtils.fileFilterImage })

router.post('/', adminAuthenticated, list)
router.post('/add', upload.any(), adminAuthenticated, add)
router.post('/:product_category_id/edit', upload.any(), adminAuthenticated, validProductCategory, edit)
router.post('/:product_category_id/remove', adminAuthenticated, validProductCategory, remove)

export default router
