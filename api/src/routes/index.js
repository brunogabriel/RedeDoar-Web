import express from 'express'
const router = express.Router()

import { authenticated } from './filters'
import home from './home'
import users from './users'
import products from './products'
import product_categories from './product_categories'
import product_favorites from './product_favorites'
import admin from './admin'
import { terms_of_use } from './pages'

router.use('/', home)
router.use('/users', users)
router.use('/products', products)
router.use('/product_categories', product_categories)
router.use('/product_favorites', authenticated, product_favorites)
router.use('/admin', admin)
router.use('/terms-of-use', terms_of_use)
router.use(express.static('public'))

router.use((err, req, res, next) => {
  let message = err.message
  let code = err.code
  let status = err.status

  if (err.name == 'ValidationError') {
    let errors = []
    for (let i in err.errors) {
      errors.push(err.errors[i].message)
    }
    message = errors.join(', ')
  } else if (err.response) {
    if (err.response.error.message) message = err.response.error.message
    if (err.response.error.code) code = err.response.error.code
  }

  res.status(status || 200)
  res.send({
    status: false,
    message: message
  })
})

router.use('*', (req, res, next) => {
  res.send({ status: false, message: res.__('Not found') })
})

export default router
