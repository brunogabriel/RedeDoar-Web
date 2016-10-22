import express from 'express'
const router = express.Router()

import users from './users'

// router.all('/*', adminAuthenticated)
router.use('/users', users)
router.get('/product_categories', (req, res, next) => {
  res.set('Content-Type', 'application/json')
  res.send({ data: [], total: 0 })
})

export default router
