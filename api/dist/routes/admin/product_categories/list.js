'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  return _helpers.pagination.paginate(_models.ProductCategory, req).then(function (result) {
    var data = _helpers.productCategoryView.prepareData(result.data);
    res.send({
      status: true,
      data: data,
      paging: result.paging
    });
  });
};