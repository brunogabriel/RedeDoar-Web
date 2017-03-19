'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

exports.default = function (req, res, next) {
  res.send({
    status: true,
    message: res.__('Profile found'),
    data: req.user
  });
};