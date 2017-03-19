'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

exports.default = function (req, res, next) {
  _models.User.disable(req.user).save().then(function (user) {
    _models.Product.update({ user: user.id }, { active: false }, { multi: true }).then(function (raw) {
      res.send({
        status: true,
        message: res.__('Conta desativada com sucesso')
      });
    }).catch(next);
  }).catch(next);
};