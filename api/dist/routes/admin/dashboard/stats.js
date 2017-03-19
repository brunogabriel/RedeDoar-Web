'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var items = [];

  items.push(_models.Product.count({ state: null }).then(function (count) {
    return { active_donations: count };
  }));

  items.push(_models.Product.count({ state: 'donated' }).then(function (count) {
    return { donations_made: count };
  }));

  items.push(_models.Product.count({ state: 'canceled' }).then(function (count) {
    return { canceled_donations: count };
  }));

  var month_names = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  var date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 5);

  var _loop = function _loop(i) {
    var current_date = date;
    var next_date = new Date();
    next_date.setDate(1);
    next_date.setMonth(date.getMonth() + 1);
    var conditions = { createdAt: { $gte: date, $lt: next_date } };
    items.push(_models.Product.count(conditions).then(function (count) {
      var month = month_names[current_date.getMonth()] + '/' + current_date.getFullYear();
      return { sort: i, month: month, count: count };
    }));
    date = next_date;
  };

  for (var i = 0; i < 6; i++) {
    _loop(i);
  }

  return _bluebird2.default.all(items).then(function (items) {
    var donation = [];
    var data = {};
    items.forEach(function (item) {
      if (!item.month) {
        data = _lodash2.default.merge(data, item);
      } else {
        donation.push(item);
      }
    });
    data.donation = _lodash2.default.sortBy(donation, 'sort');
    res.send({
      status: true,
      data: data
    });
  });
};