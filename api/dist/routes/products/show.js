'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  _models.Product.findById(req.params.product_id).populate('user', 'name').populate('category', 'name').then(function (product) {
    product = _helpers.productView.prepareData(product);
    res.send({
      status: true,
      data: product
    });
  }).catch(next);
};