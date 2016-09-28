import { User } from '../../models'

export const accessTokenRequired = (req, res, next) => {
  if (!req.query.token && !req.body.token) {
    return res.send({
      status: false,
      message: 'Token inválido'
    })
  }
  const access_token = req.query.token || req.body.token
  next(access_token)
}

export const authenticated = (req, res, next) => {
  // Testes
  next()

  // Descomentar
  // return accessTokenRequired(req, res, (access_token) => {
  //   return User.byAccessToken(access_token).then((user) => {
  //     if (user) {
  //       req.user = user
  //       next()
  //     } else {
  //       return res.send({
  //         status: false,
  //         message: 'Você precisa se logar para acessar essa página'
  //       })
  //     }
  //   })
  // })
}
