'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../../models');

exports.default = function (req, res, next) {
  var token = req.body.token;
  return _models.AdminUser.byToken(token).then(function (admin_user) {
    if (admin_user) {
      res.send({
        status: true,
        message: 'Usuário encontrado com sucesso!',
        data: admin_user
      });
    } else {
      res.send({
        status: false,
        message: 'Token inválido'
      });
    }
  });
};