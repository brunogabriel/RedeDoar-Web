'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  var condition = { _id: req.params.id };
  var params = { active: req.body.active };
  return _models.Product.update({ _id: req.params.id, state: null }, { active: req.body.active }, { multi: true }).then(function (products) {
    res.send({
      status: true,
      data: products
    });
  }, function (err) {
    next({ message: _helpers.handleError.getMessage(err) });
  });
};