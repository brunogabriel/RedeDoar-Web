'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  _models.ProductCategory.find().sort({ name: 'asc' }).then(function (product_categories) {
    var data = _helpers.productCategoryView.prepareData(product_categories);
    res.send({
      status: true,
      data: data
    });
  }).catch(next);
};