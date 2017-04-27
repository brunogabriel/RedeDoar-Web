import { User } from '../../models'
import { googleUtils } from '../../helpers'

export default (req, res, next) => {
  const oauth2Client = googleUtils.getClient()
  oauth2Client.getToken(req.query.code, (err, tokens) => {
    if (!err) {
      oauth2Client.setCredentials(tokens)
      googleUtils.getPeople(oauth2Client).then((result) => {
        googleUtils.onLogin(result, tokens).then((user) => {
          res.send(User.dataLoginResponse(user, req))
        }).catch(next)
      }).catch(next)
    } else {
      next(err)
    }
  })
}
