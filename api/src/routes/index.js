import express from 'express'
const router = express.Router()

import home from './home'
import users from './users'

router.use('/', home)
router.use('/users', users)

router.use((err, req, res, next) => {
  let message = err.message
  let code = err.code
  let status = err.status

  if (err.response) {
    if (err.response.error.message) message = err.response.error.message
    if (err.response.error.code) code = err.response.error.code
    if (err.response.error.status) status = err.response.error.status
  }

  res.status(status || 500)
  res.send({
    status: false,
    message: message,
    code: code,
    session: req.session
  })
})

router.use('*', (req, res, next) => {
  res.send({ status: false, message: 'Not found' })
})

export default router
