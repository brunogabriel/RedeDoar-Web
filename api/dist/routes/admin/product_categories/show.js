'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  return _models.ProductCategory.findById(req.params.product_category_id).then(function (product_category) {
    var data = _helpers.productCategoryView.prepareData(product_category);
    res.send({
      status: true,
      data: data
    });
  });
};