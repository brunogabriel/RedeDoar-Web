'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

exports.default = function (req, res, next) {
  if (req.body.token) {
    _models.User.loginWithToken(req.body.token).then(function (user) {
      res.send(_models.User.dataLoginResponse(user, req));
    }).catch(next);
  } else {
    _models.User.loginAccount(req.body).then(function (user) {
      res.send(_models.User.dataLoginResponse(user, req));
    }).catch(next);
  }
};