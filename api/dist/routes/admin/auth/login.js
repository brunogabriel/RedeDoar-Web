'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

exports.default = function (req, res, next) {
  var options = {
    username: req.body.username,
    password: req.body.password
  };
  return _models.AdminUser.authUser(options).then(function (admin_user) {
    if (admin_user) {
      admin_user.generateToken().then(function (admin_user) {
        res.send({
          status: true,
          message: 'Login efetuado com sucesso!',
          data: admin_user
        });
      });
    } else {
      res.send({
        status: false,
        message: 'Dados inválidos'
      });
    }
  });
};