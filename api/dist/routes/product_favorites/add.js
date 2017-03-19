'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var product_id = req.body.product_id;
  var options = {
    user: req.user.id,
    product: product_id
  };
  _models.ProductFavorite.findOne(options).then(function (product_favorite) {
    if (!product_favorite) {
      var _product_favorite = new _models.ProductFavorite(options);
      _product_favorite.save().then(function (product_favorite) {
        if (product_favorite) {
          res.send({
            status: true,
            message: res.__('Donation saves to favorites'),
            data: product_favorite
          });
        } else {
          res.send({
            status: false,
            message: res.__('Erro to add donation in favorites')
          });
        }
      }).catch(next);
    } else {
      res.send({
        status: false,
        message: res.__('You have already added this to the favorites')
      });
    }
  }).catch(next);
};