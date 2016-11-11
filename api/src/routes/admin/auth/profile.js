import { AdminUser } from '../../../models'

export default (req, res, next) => {
  let token = req.body.token
  return AdminUser.byToken(token).then((admin_user) => {
    if (admin_user) {
      res.send({
        status: true,
        message: 'Usuário encontrado com sucesso!',
        data: admin_user
      })
    } else {
      res.send({
        status: false,
        message: 'Token inválido'
      })
    }
  })
}
