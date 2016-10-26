import express from 'express'
const router = express.Router()

import users from './users'
import product_categories from './product_categories'

router.use('/users', users)
router.use('/product_categories', product_categories)

export default router
