'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var options = {
    _id: req.params.id,
    user: req.user.id
  };
  _models.ProductFavorite.findOne(options).then(function (product_favorite) {
    if (product_favorite) {
      product_favorite.remove().then(function (product_favorite) {
        if (product_favorite) {
          res.send({
            status: true,
            message: res.__('Favorite successfully removed')
          });
        } else {
          res.send({
            status: false,
            message: res.__('Error removing product from favorites')
          });
        }
      }).catch(next);
    } else {
      res.send({
        status: false,
        message: res.__('Favorite not found')
      });
    }
  }).catch(next);
};