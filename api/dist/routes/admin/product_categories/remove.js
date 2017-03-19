'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  var product_category = req.product_category;
  return product_category.remove().then(function (product_category) {
    if (product_category) {
      _helpers.productCategoryImage.removeDirectory(product_category);
      res.send({
        status: true,
        message: 'Categoria removida com sucesso'
      });
    } else {
      res.send({
        status: false,
        message: 'Erro ao remover categoria'
      });
    }
  });
};