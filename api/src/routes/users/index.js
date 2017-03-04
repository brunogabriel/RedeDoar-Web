import express from 'express'
import FB from 'fb'

import config from '../../config'
import { authenticated } from '../filters'

import login from './login'
import facebook from './facebook'
import facebookCallback from './facebook_callback'
import google from './google'
import googleCallback from './google_callback'
import profile from './profile'
import disable from './disable'
import create from './create'

const router = express.Router()

// @todo: mover configuracao do facebook para um facebookUtils
FB.options({
  appId: config.facebook.appId,
  appSecret: config.facebook.appSecret,
  redirectUri: config.facebook.redirectUri
});

router.post('/', create)
router.post('/login', login)
router.get('/login/facebook', facebook)
router.get('/login/google', google)
router.get('/facebook/callback', facebookCallback)
router.get('/google/callback', googleCallback)
router.post('/profile', authenticated, profile)
router.post('/disable', authenticated, disable)

export default router
