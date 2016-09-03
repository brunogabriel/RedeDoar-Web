import express from 'express'
import FB from 'fb'
import Step from 'step'

import config from '../../config'
import { User } from '../../models'
import { accessTokenRequired } from '../filters'

import login from './login'
import loginCallback from './login_callback'
import profile from './profile'

const router = express.Router()

FB.options({
  appId: config.facebook.appId,
  appSecret: config.facebook.appSecret,
  redirectUri: config.facebook.redirectUri
});

router.get('/login', login)
router.get('/login/callback', loginCallback)
router.get('/profile', accessTokenRequired, profile)

export default router
