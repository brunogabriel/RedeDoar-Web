import express from 'express'
const router = express.Router()

import login from './login'
import profile from './profile'

router.post('/login', login)
router.get('/profile', profile)

export default router
