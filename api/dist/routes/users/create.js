'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

exports.default = function (req, res, next) {
  _models.User.createAccount(req.body).then(function (user) {
    res.send({
      status: true,
      data: user
    });
  }).catch(next);
};