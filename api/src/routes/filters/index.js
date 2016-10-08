import { User } from '../../models'
import { Product } from '../../models'

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
  return accessTokenRequired(req, res, (access_token) => {
    return User.byAccessToken(access_token).then((user) => {
      if (user) {
        req.user = user
        next()
      } else {
        return res.send({
          status: false,
          message: 'Você precisa se logar para acessar essa página'
        })
      }
    })
  })
}

export const validProduct = (req, res, next) => {
  let product_id = req.body.product_id || req.params.product_id
  return Product.findById(product_id).then((product) => {
    if (product) {
      req.product = product
      next()
    } else {
      return res.send({
        status: false,
        message: 'Produto não encontrado'
      })
    }
  }, (error) => {
    return res.send({
      status: false,
      message: 'Produto não encontrado',
      error: error
    })
  })
}
