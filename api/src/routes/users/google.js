import google from 'googleapis'
import { User } from '../../models'
import config from '../../config'

export default (req, res, next) => {
  const OAuth2 = google.auth.OAuth2
  const oauth2Client = new OAuth2(
    config.google.appId,
    config.google.appSecret,
    config.google.redirectUri
  )
  if (req.query.token) {
    oauth2Client.setCredentials({
      access_token: req.query.token,
      refresh_token: req.query.refresh_token
    })
    googleUtils.getPeople(oauth2Client).then((result) => {
      googleUtils.onLogin(result, tokens).then((user) => {
        res.send(User.dataLoginResponse(user, req))
      }).catch(next)
    }).catch(next)
  } else {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: config.google.scopes,
    })
    res.redirect(url)
  }
}
