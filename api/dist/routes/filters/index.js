'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validProductCategory = exports.adminAuthenticated = exports.validProductUser = exports.validProduct = exports.authenticated = exports.accessTokenRequired = undefined;

var _models = require('../../models');

var accessTokenRequired = exports.accessTokenRequired = function accessTokenRequired(req, res, next) {
  if (!req.query.token && !req.body.token) {
    return res.send({
      status: false,
      message: res.__('Invalid token')
    });
  }
  var access_token = req.query.token || req.body.token;
  next(access_token);
};

var authenticated = exports.authenticated = function authenticated(req, res, next) {
  return accessTokenRequired(req, res, function (access_token) {
    return _models.User.byAccessToken(access_token).then(function (user) {
      if (user) {
        req.user = user;
        next();
      } else {
        return res.send({
          status: false,
          message: res.__('You must be logged in to access this page')
        });
      }
    });
  });
};

var validProduct = exports.validProduct = function validProduct(req, res, next) {
  var product_id = req.body.product_id || req.params.product_id;
  _models.Product.findById(product_id).then(function (product) {
    if (product) {
      req.product = product;
      next();
    } else {
      res.send({
        status: false,
        message: res.__('Donation not found')
      });
    }
  }).catch(next);
};

var validProductUser = exports.validProductUser = function validProductUser(req, res, next) {
  var product_id = req.body.product_id || req.params.product_id;
  var options = {
    _id: product_id,
    user: req.user.id
  };
  _models.Product.findOne(options).then(function (product) {
    if (product) {
      req.product = product;
      next();
    } else {
      res.send({
        status: false,
        message: res.__('Donation not found'),
        product: product
      });
    }
  }).catch(next);
};

var adminAuthenticated = exports.adminAuthenticated = function adminAuthenticated(req, res, next) {
  if (!req.query.token && !req.body.token) {
    return res.send({
      status: false,
      message: 'Token inválido'
    });
  }
  var token = req.query.token || req.body.token;
  var options = { token: token };
  _models.AdminUser.findOne(options).then(function (admin_user) {
    if (admin_user) {
      req.admin_user = admin_user;
      next();
    } else {
      res.send({
        status: false,
        message: res.__('User not found')
      });
    }
  }).catch(next);
};

var validProductCategory = exports.validProductCategory = function validProductCategory(req, res, next) {
  var product_category_id = req.body.product_category_id || req.params.product_category_id;
  _models.ProductCategory.findById(product_category_id).then(function (product_category) {
    if (product_category) {
      req.product_category = product_category;
      next();
    } else {
      res.send({
        status: false,
        message: res.__('Category not found')
      });
    }
  }).catch(next);
};