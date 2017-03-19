'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

var _helpers = require('../../../helpers');

exports.default = function (req, res, next) {
  var product_category = new _models.ProductCategory({ name: req.body.name });
  return product_category.save().then(function (product_category) {
    var options = product_category.getImageOptions();
    var images = (0, _helpers.cropFiles)(req.files, options);
    var output = {
      status: true,
      message: 'Categoria adicionada com sucesso'
    };

    if (images.length > 0) {
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