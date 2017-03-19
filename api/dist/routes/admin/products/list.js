'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  var params = {
    populate: [{
      path: 'user',
      select: 'name'
    }, {
      path: 'category',
      select: 'name'
    }, {
      path: 'to_user',
      select: 'name'
    }]
  };
  return _helpers.pagination.paginate(_models.Product, req, params).then(function (result) {
    var data = _helpers.productView.prepareData(result.data);
    res.send({
      status: true,
      data: data,
      paging: result.paging
    });
  }, function (err) {
    next({ message: _helpers.handleError.getMessage(err) });
  });
};