// @deprecated passport

import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../../models'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import config from '../../config'

const router = express.Router()

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        done(null, false, { message: 'Incorrect username/password.' })
      } else if (!user.validPassword(password)) {
        done(null, false, { message: 'Incorrect username/password.' })
      } else {
        done(null, user)
      }
    }).catch(done)
  }
))

passport.use(new FacebookStrategy(
  {
    clientID: config.facebook.appId,
    clientSecret: config.facebook.appSecret,
    callbackURL: config.facebook.redirectUri
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken);
    let data = {
      name: profile.displayName,
      facebook: {
        id: profile.id,
        gender: profile.gender,
      }
    }
    let onCreateOrUpdate = (user) => {
      done(null, user)
    }
    User.findOne({ 'facebook.id': profile.id }).then((user) => {
      if (user) {
        user.updateAccount(data).then(onCreateOrUpdate).catch(done)
      } else {
        User.create(data).then(onCreateOrUpdate).catch(done)
      }
    }).catch(done)
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    let err = null
    if (!user) err = 'Usuário não encontrado'
    done(err, user)
  }).catch((err) => {
    done(err, null)
  })
})

router.use(passport.initialize())
router.use(passport.session())

router.post('/web', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    res.send({
      status: !!user,
      data: user || null
    })
  })(req, res, next)
})

router.get('/facebook', 
  passport.authenticate('facebook', {
    scope: config.facebook.scope.split(',')
  })
)

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if (err) { return next(err) }
    res.send({
      status: !!user,
      data: user || null,
      info: info
    })
  })(req, res, next)
})

export default router
