import express from 'express'
const router = express.Router()

import auth from './auth'
import product_categories from './product_categories'
import users from './users'

router.use('/auth', auth)
router.use('/product_categories', product_categories)
router.use('/users', users)

export default router
