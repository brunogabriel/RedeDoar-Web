'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fb = require('fb');

var _fb2 = _interopRequireDefault(_fb);

var _step = require('step');

var _step2 = _interopRequireDefault(_step);

var _models = require('../../models');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var code = req.query.code;

  if (req.query.error) {
    res.send({ status: false, error: req.query.error });
  } else if (!code) {
    res.send({ status: false, error: 'Invalid code' });
  }

  (0, _step2.default)(function exchangeCodeForAccessToken() {
    _fb2.default.napi('oauth/access_token', {
      client_id: _fb2.default.options('appId'),
      client_secret: _fb2.default.options('appSecret'),
      redirect_uri: _fb2.default.options('redirectUri'),
      code: code
    }, this);
  }, function extendAccessToken(err, result) {
    if (err) return next(err);

    _fb2.default.napi('oauth/access_token', {
      client_id: _fb2.default.options('appId'),
      client_secret: _fb2.default.options('appSecret'),
      grant_type: 'fb_exchange_token',
      fb_exchange_token: result.access_token
    }, this);
  }, function getMe(err, result) {
    if (err) return next(err);

    var access_token = result.access_token;
    var expires = result.expires || 0;
    var parameters = {
      access_token: result.access_token,
      fields: _config2.default.facebook.fields
    };

    _fb2.default.api('/me/', 'get', parameters, function (result) {
      return _models.User.hasFacebookId(result.id).then(function (user) {
        var user_data = {
          name: result.name,
          email: result.email,
          gender: result.gender,
          birthday: result.birthday,
          facebook: {
            id: result.id,
            accessToken: access_token,
            expires: Date.now() + expires
          }
        };
        if (!user) {
          return _models.User.createAccount(user_data).then(function (user) {
            return res.send({
              status: true,
              access_token: access_token,
              expires: expires,
              new_account: true,
              data: user
            });
          });
        } else {
          user.update(user_data).then(function (data) {
            return res.send({
              status: true,
              access_token: access_token,
              expires: expires,
              new_account: false,
              data: user,
              update: data
            });
          });
        }
      });
    });
  });
};