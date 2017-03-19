'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _product_categories = require('./product_categories');

var _product_categories2 = _interopRequireDefault(_product_categories);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

var _dashboard = require('./dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/auth', _auth2.default);
router.use('/product_categories', _product_categories2.default);
router.use('/users', _users2.default);
router.use('/products', _products2.default);
router.use('/dashboard', _dashboard2.default);

exports.default = router;