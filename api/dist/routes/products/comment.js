'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var product = req.product;
  var comment = req.body.comment;
  product.comments.push({
    comment: comment,
    user: req.user.id
  });
  product.save().then(function (product) {
    var comment = product.comments[product.comments.length - 1];
    res.send({
      status: true,
      message: res.__('Comment saved successfully!'),
      data: comment
    });
  }).catch(next);
};