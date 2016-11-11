import express from 'express'
const router = express.Router()

import login from './login'
import profile from './profile'

router.post('/login', login)
router.post('/profile', profile)

export default router
