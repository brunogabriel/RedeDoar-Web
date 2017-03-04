import { User } from '../../models'
import { googleUtils } from '../../helpers'

export default (req, res, next) => {
  const oauth2Client = googleUtils.getClient()
  oauth2Client.getToken(req.query.code, (err, tokens) => {
    if (!err) {
      oauth2Client.setCredentials(tokens)
      googleUtils.getPeople(oauth2Client).then((result) => {
        User.byNetworkId(result.id, 'google').then((user) => {
          let user_data = googleUtils.formatUserData(result, tokens)
          if (user) {
            let user_data_update = {
              google: user_data.google
            }
            user.updateAccount(user_data_update).then((user) => {
              res.send({
                status: true,
                data: user
              })
            }).catch(next)
          } else {
            User.createAccount(user_data).then((user) => {
              res.send({
                status: true,
                data: user
              })
            }).catch(next)
          }
        })
      }).catch(next)
    } else {
      next(err)
    }
  })
}
