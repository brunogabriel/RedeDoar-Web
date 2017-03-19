'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var params = {
    select: 'name gender email picture language active'
  };
  return _helpers.pagination.paginate(_models.User, req, params).then(function (result) {
    var data = result.data;
    var items = [];
    data.forEach(function (item) {
      items.push(_models.Product.count({ user: item._id }).then(function (count) {
        item.set('products_count', count, { strict: false });
        return item;
      }));
    });
    return _bluebird2.default.all(items).then(function (items) {
      res.send({
        status: true,
        data: data,
        paging: result.paging
      });
    });
  });
};