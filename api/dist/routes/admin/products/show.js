'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  return _models.Product.findById(req.params.id).populate('user', 'name active').populate('category', 'name').populate('to_user', 'name').then(function (product) {
    product = _helpers.productView.prepareData(product);
    res.send({
      status: true,
      data: product
    });
  }, function (err) {
    next({ message: _helpers.handleError.getMessage(err) });
  });
};