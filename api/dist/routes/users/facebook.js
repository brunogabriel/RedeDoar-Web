'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fb = require('fb');

var _fb2 = _interopRequireDefault(_fb);

var _models = require('../../models');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _helpers = require('../../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  if (req.query.token) {
    (function () {
      var access_token = req.body.token;
      var terms_of_use = req.body.terms_of_use;
      var parameters = {
        access_token: access_token,
        fields: _config2.default.facebook.fields
      };
      _fb2.default.api('/me/', 'get', parameters, function (result) {
        if (result.error) {
          var error = {
            cause: result.error.message,
            type: result.error.type,
            code: result.error.code,
            fbtrace_id: result.error.fbtrace_id
          };
          return res.send({
            status: false,
            message: res.__('Failed to log in, user not found'),
            error: error
          });
        } else {
          return _models.User.hasFacebookId(result.id).then(function (user) {
            var user_data = {
              name: result.name,
              email: result.email,
              gender: result.gender,
              birthday: result.birthday,
              picture: result.picture.data.url,
              language: req.body.language,
              facebook: {
                id: result.id,
                accessToken: access_token
              },
              mobileDevices: [{
                pushId: req.body.pushId,
                platform: req.body.platform
              }]
            };
            if (terms_of_use !== undefined) {
              user_data.termsOfUse = terms_of_use;
            }
            var termsOfUseUrl = _helpers.api.url('/terms-of-use?language=' + req.body.language);
            if (!user) {
              return _models.User.createAccount(user_data).then(function (user) {
                var notifications_count = 101;
                return res.send({
                  status: true,
                  new_account: !user.termsOfUse,
                  access_token: access_token,
                  data: user,
                  notifications: notifications_count,
                  termsOfUseUrl: termsOfUseUrl
                });
              });
            } else {
              var mobileDevices = user_data.mobileDevices;
              user_data.mobileDevices = user.mobileDevices;

              var count = user_data.mobileDevices.filter(function (item) {
                return item.pushId == req.body.pushId && item.platform == req.body.platform;
              }).length;

              if (count == 0) {
                user_data.mobileDevices = user_data.mobileDevices.concat(mobileDevices);
              }

              user.update(user_data).then(function (data) {
                if (data.ok) {
                  return _models.User.findById(user._id).then(function (user) {
                    var notifications_count = 101;
                    return res.send({
                      status: true,
                      new_account: !user.termsOfUse,
                      access_token: access_token,
                      data: user,
                      notifications: notifications_count,
                      termsOfUseUrl: termsOfUseUrl
                    });
                  }).catch(function (err) {
                    next(err);
                  });
                } else {
                  res.send({
                    status: false,
                    message: res.__('Error updating data')
                  });
                }
              });
            }
          });
        }
      });
    })();
  } else {
    res.redirect(_fb2.default.getLoginUrl({ scope: _config2.default.facebook.scope }));
  }
};