import express from 'express'
const router = express.Router()

import auth from './auth'
import product_categories from './product_categories'
import users from './users'
import products from './products'

router.use('/auth', auth)
router.use('/product_categories', product_categories)
router.use('/users', users)
router.use('/products', products)

export default router
