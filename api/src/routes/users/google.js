import google from 'googleapis'
import config from '../../config'

export default (req, res, next) => {
  const OAuth2 = google.auth.OAuth2
  const oauth2Client = new OAuth2(
    config.google.appId,
    config.google.appSecret,
    config.google.redirectUri
  )
  if (req.query.token) {
  } else {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: config.google.scopes,
    })
    res.redirect(url)
  }
}
