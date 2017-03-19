'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  var product_category = req.product_category;
  return product_category.patchEntity(req.body).save().then(function (product_category) {
    var options = product_category.getImageOptions();
    var images = (0, _helpers.cropFiles)(req.files, options);
    var output = {
      status: true,
      message: 'Categoria alterada com sucesso'
    };

    if (images.length > 0) {
      _helpers.productCategoryImage.remove(product_category.image);
      product_category.image = images[0];
      product_category.save(function (err) {
        if (err) new Error(err);
        output.data = _helpers.productCategoryView.prepareData(product_category);
        res.send(output);
      });
    } else {
      output.data = _helpers.productCategoryView.prepareData(product_category);
      res.send(output);
    }
  });
};