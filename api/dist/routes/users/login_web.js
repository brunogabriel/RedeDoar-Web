'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fb = require('fb');

var _fb2 = _interopRequireDefault(_fb);

var _models = require('../../models');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  if (req.query.access_token) {
    return _models.User.byAccessToken(req.query.access_token).then(function (user) {
      if (user) {
        res.send({
          status: true,
          data: user
        });
      } else {
        res.send({
          status: false,
          message: 'Access token inválido'
        });
      }
    });
  } else {
    res.send({
      status: true,
      login_url: _fb2.default.getLoginUrl({ scope: _config2.default.facebook.scope })
    });
  }
};