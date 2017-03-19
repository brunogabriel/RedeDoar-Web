'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var product = new _models.Product(req.body);
  product.user = req.user.id;
  return product.save().then(function (product) {
    var options = product.getImageOptions();
    var images = (0, _helpers.cropFiles)(req.files, options);
    var output = {
      status: true,
      message: res.__('Donation was saved!')
    };

    if (images && images.length > 0) {
      product.images = images;
      product.save(function (err) {
        if (err) new Error(err);
        output.data = _helpers.productView.prepareData(product);
        res.send(output);
      });
    } else {
      product.remove();
      output.status = false;
      output.message = res.__('You must send at least 1 photo.');
      res.send(output);
    }
  }).catch(next);
};