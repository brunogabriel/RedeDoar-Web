'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var product = req.product;
  return product.remove().then(function (product) {
    _helpers.productImage.removeDirectory(product);
    res.send({
      status: true,
      message: res.__('Donation was removed')
    });
  }).catch(next);
};