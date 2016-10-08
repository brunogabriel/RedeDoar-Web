import { User } from '../../models'

export default (req, res, next) => {
  res.send({
    status: true,
    message: 'Dados resgatados com sucesso',
    data: req.user
  })
}
