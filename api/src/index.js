import express from 'express'
import options from './config'
import { Facebook, FacebookApiException } from 'fb';
import { home } from './routes'

let app = express()
let fb = new Facebook(options)

app.get('/', home.index)
app.get('/login/callback', home.loginCallback)
app.get('/me', home.me)

app.use((err, req, res, next) => {
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

export default app
