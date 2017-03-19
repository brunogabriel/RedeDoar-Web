'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  var fields = 'name gender email picture language active';
  return _models.User.findById(req.params.id, fields).then(function (user) {
    var data = user;
    return _models.Product.find({ user: user._id }).populate('category', 'name').populate('to_user', 'name').sort({ _id: 'desc' }).then(function (products) {
      products = _helpers.productView.prepareData(products);
      data.set('products', products, { strict: false });
      data.set('products_count', products.length, { strict: false });
      res.send({
        status: true,
        data: data
      });
    });
  }, function (err) {
    next({ message: _helpers.handleError.getMessage(err) });
  });
};