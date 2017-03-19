'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var options = { runValidators: true };
  var data = { active: false, state: req.body.state };
  if (req.body.to_user) data.to_user = req.body.to_user;

  _models.Product.update({ _id: req.product.id }, data, options).then(function (product) {
    res.send({
      status: true,
      message: res.__('Your donation was successfully closed!')
    });
  }).catch(next);
};