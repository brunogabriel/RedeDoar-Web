'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var params = { active: true };
  var options = {
    select: ['_id', 'title', 'description', 'delivery', 'condition', 'category', 'user', 'images', 'comments', 'contact_type', 'contact_value', 'to_user', 'state', 'location.context'].join(' '),
    populate: [{
      path: 'user',
      select: 'name'
    }, {
      path: 'to_user',
      select: 'name'
    }, {
      path: 'category',
      select: 'name'
    }]
  };
  if (!req.query.latitude && !req.query.longitude) {
    options.sort = 'title';
  }
  return _helpers.pagination.paginate(_models.Product, req, options, params).then(function (result) {
    var data = _helpers.productView.prepareData(result.data);
    res.send({
      status: true,
      data: data,
      paging: result.paging
    });
  }).catch(next);
};