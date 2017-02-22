import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send({
    status: true,
    message: res.__('Welcome!')
  })
})

export default router
