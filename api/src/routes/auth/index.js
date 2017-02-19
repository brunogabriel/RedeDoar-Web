import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../../models'

const router = express.Router()

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username/password.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect username/password.' })
      }
      return done(null, user)
    })
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
router.post('/web', passport.authenticate('local'), (req, res, next) => {
  res.send({
    status: true,
    data: req.session.passport
  })
})

export default router
