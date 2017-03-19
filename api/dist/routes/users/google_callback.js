'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _helpers = require('../../helpers');

exports.default = function (req, res, next) {
  var oauth2Client = _helpers.googleUtils.getClient();
  oauth2Client.getToken(req.query.code, function (err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens);
      _helpers.googleUtils.getPeople(oauth2Client).then(function (result) {
        _models.User.byNetworkId(result.id, 'google').then(function (user) {
          var user_data = _helpers.googleUtils.formatUserData(result, tokens);
          if (user) {
            var user_data_update = {
              google: user_data.google
            };
            user.updateAccount(user_data_update).then(function (user) {
              res.send(_models.User.dataLoginResponse(user, req));
            }).catch(next);
          } else {
            _models.User.createAccount(user_data).then(function (user) {
              res.send(_models.User.dataLoginResponse(user, req));
            }).catch(next);
          }
        });
      }).catch(next);
    } else {
      next(err);
    }
  });
};