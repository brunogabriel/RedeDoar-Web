import { AdminUser } from '../../../models'

export default (req, res, next) => {
  let options = {
    username: req.body.username,
    password: req.body.password
  }
  return AdminUser.authUser(options).then((admin_user) => {
    if (admin_user) {
      admin_user.generateToken().then((admin_user) => {
        res.send({
          status: true,
          message: 'Login efetuado com sucesso!',
          data: admin_user
        })
      })
    } else {
      res.send({
        status: false,
        message: 'Dados inválidos'
      })
    }
  })
}
