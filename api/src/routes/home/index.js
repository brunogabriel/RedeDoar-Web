import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send({
    status: true,
    message: 'Bem-vindo!',
    links: [{
      login: '/users/login',
      profile: '/users/profile?access_token='
    }]
  })
})

export default router
