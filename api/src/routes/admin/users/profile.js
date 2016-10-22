// import { AdminUser } from '../../models'

export default (req, res, next) => {
  res.send({
    status: true,
    message: 'Login efetuado com sucesso!',
    data: {
      id: 1,
      name: 'Admin',
      token: '123'
    }
  })
}
