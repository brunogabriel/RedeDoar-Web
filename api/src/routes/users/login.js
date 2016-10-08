import FB from 'fb'
import { User } from '../../models'
import config from '../../config'

export default (req, res, next) => {
  if (req.body.token) {
    let access_token = req.body.token
    let parameters = {
      access_token: access_token,
      fields: config.facebook.fields
    }
    console.log(parameters);
    FB.api('/me/', 'get', parameters, (result) => {
      console.log("---");
      console.log(result);
      console.log("---");
      if (result.error) {
        let error = {
          cause: result.error.message,
          type: result.error.type,
          code: result.error.code,
          fbtrace_id: result.error.fbtrace_id
        }
        return res.send({
          status: false,
          message: 'Falha ao efetuar login, usuário não encontrado',
          error: error
        })
      } else {
        return User.hasFacebookId(result.id).then((user) => {
          let user_data = {
            name: result.name,
            email: result.email,
            gender: result.gender,
            birthday: result.birthday,
            picture: result.picture.data.url,
            language: req.body.language,
            facebook: {
              id: result.id,
              accessToken: access_token
            },
            mobileDevices: [{
              pushId: req.body.pushId,
              platform: req.body.platform
            }]
          }
          if (!user) {
            return User.createAccount(user_data).then((user) => {
              let notifications_count = 101
              return res.send({
                status: true,
                new_account: true,
                access_token: access_token,
                data: user,
                notifications: notifications_count
              })
            })
          } else {
            let mobileDevices = user_data.mobileDevices
            user_data.mobileDevices = user.mobileDevices

            let count = user_data.mobileDevices.filter((item) => {
              return item.pushId == req.body.pushId && item.platform == req.body.platform
            }).length

            if (count == 0) {
              user_data.mobileDevices = user_data.mobileDevices.concat(mobileDevices)
            }

            user.update(user_data).then((data) => {
              if (data.ok) {
                return User.findById(user.id).then((user) => {
                  let notifications_count = 101
                  return res.send({
                    status: true,
                    new_account: false,
                    access_token: access_token,
                    data: user,
                    notifications: notifications_count
                  })
                })
              } else {
                return res.send({
                  status: false,
                  message: 'Erro ao atualizar dados'
                })
              }
            })
          }
        })
      }
    })
  } else {
    res.send({
      status: false,
      message: 'Access token inválido'
    })
  }
}
