'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var product = req.product;
  return product.patchEntity(req.body).save().then(function (product) {
    var options = product.getImageOptions();
    var images = (0, _helpers.cropFiles)(req.files, options);
    var output = {
      status: true,
      message: res.__('Donation changed successfully')
    };

    if (images.length > 0) {
      for (var i in images) {
        if (product.images[i]) {
          _helpers.productImage.remove(product.images[i]);
        }
      }
      product.images = images;
      product.save().then(function (product) {
        output.data = _helpers.productView.prepareData(product);
        res.send(output);
      }).catch(next);
    } else {
      output.data = _helpers.productView.prepareData(product);
      res.send(output);
    }
  }).catch(next);
};