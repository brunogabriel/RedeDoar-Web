'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _filters = require('./filters');

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

var _product_categories = require('./product_categories');

var _product_categories2 = _interopRequireDefault(_product_categories);

var _product_favorites = require('./product_favorites');

var _product_favorites2 = _interopRequireDefault(_product_favorites);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _pages = require('./pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/', _home2.default);
router.use('/users', _users2.default);
router.use('/products', _products2.default);
router.use('/product_categories', _product_categories2.default);
router.use('/product_favorites', _filters.authenticated, _product_favorites2.default);
router.use('/admin', _admin2.default);
router.use('/terms-of-use', _pages.terms_of_use);
router.use(_express2.default.static('public'));

router.use(function (err, req, res, next) {
  var message = err.message;
  var code = err.code;
  var status = err.status;

  if (err.name == 'ValidationError') {
    var errors = [];
    for (var i in err.errors) {
      errors.push(err.errors[i].message);
    }
    message = errors.join(', ');
  } else if (err.response) {
    if (err.response.error.message) message = err.response.error.message;
    if (err.response.error.code) code = err.response.error.code;
  }

  res.status(status || 200);
  res.send({
    status: false,
    message: message
  });
});

router.use('*', function (req, res, next) {
  res.send({ status: false, message: res.__('Not found') });
});

exports.default = router;