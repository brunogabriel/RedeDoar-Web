import express from 'express'
import FB from 'fb'

import config from '../../config'
import { User } from '../../models'
import { authenticated } from '../filters'

import login from './login'
import loginWeb from './login_web'
import loginCallback from './login_callback'
import profile from './profile'
import disable from './disable'

const router = express.Router()

FB.options({
  appId: config.facebook.appId,
  appSecret: config.facebook.appSecret,
  redirectUri: config.facebook.redirectUri
});

router.post('/login', login)
router.get('/login-web', loginWeb)
router.get('/login/callback', loginCallback)
router.post('/profile', authenticated, profile)
router.post('/disable', authenticated, disable)

export default router
