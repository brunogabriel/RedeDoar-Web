'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var options = {
    user: req.user.id
  };
  _models.ProductFavorite.find(options).then(function (product_favorites) {
    res.send({
      status: true,
      message: res.__('Listed favorites'),
      data: product_favorites
    });
  }).catch(next);
};