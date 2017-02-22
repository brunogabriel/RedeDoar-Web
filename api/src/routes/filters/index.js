import { User } from '../../models'
import { Product, ProductCategory } from '../../models'
import { AdminUser } from '../../models'

export const accessTokenRequired = (req, res, next) => {
  if (!req.query.token && !req.body.token) {
    return res.send({
      status: false,
      message: res.__('Invalid token')
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
          message: res.__('You must be logged in to access this page')
        })
      }
    })
  })
}

export const validProduct = (req, res, next) => {
  let product_id = req.body.product_id || req.params.product_id
  Product.findById(product_id).then((product) => {
    if (product) {
      req.product = product
      next()
    } else {
      res.send({
        status: false,
        message: res.__('Donation not found')
      })
    }
  }).catch(next)
}

export const validProductUser = (req, res, next) => {
  let product_id = req.body.product_id || req.params.product_id
  let options = {
    _id: product_id,
    user: req.user.id
  }
  Product.findOne(options).then((product) => {
    if (product) {
      req.product = product
      next()
    } else {
      res.send({
        status: false,
        message: res.__('Donation not found'),
        product: product
      })
    }
  }).catch(next)
}

export const adminAuthenticated = (req, res, next) => {
  if (!req.query.token && !req.body.token) {
    return res.send({
      status: false,
      message: 'Token inválido'
    })
  }
  const token = req.query.token || req.body.token
  const options = { token: token }
  AdminUser.findOne(options).then((admin_user) => {
    if (admin_user) {
      req.admin_user = admin_user
      next()
    } else {
      res.send({
        status: false,
        message: res.__('User not found')
      })
    }
  }).catch(next)
}

export const validProductCategory = (req, res, next) => {
  let product_category_id = req.body.product_category_id || req.params.product_category_id
  ProductCategory.findById(product_category_id).then((product_category) => {
    if (product_category) {
      req.product_category = product_category
      next()
    } else {
      res.send({
        status: false,
        message: res.__('Category not found')
      })
    }
  }).catch(next)
}
