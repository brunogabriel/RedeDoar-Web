import express from 'express'
const router = express.Router()

// router.all('/*', adminAuthenticated)
router.get('/product_categories', (req, res, next) => {
  res.set('Content-Type', 'application/json')
  res.send({ data: [], total: 0 })
})

export default router
