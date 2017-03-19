'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _googleapis = require('googleapis');

var _googleapis2 = _interopRequireDefault(_googleapis);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getClient: function getClient() {
    var oauth2Client = new _googleapis2.default.auth.OAuth2(_config2.default.google.appId, _config2.default.google.appSecret, _config2.default.google.redirectUri);
    return oauth2Client;
  },
  getPeople: function getPeople(oauth2Client) {
    return new _bluebird2.default(function (resolve, reject) {
      var plus = _googleapis2.default.plus('v1');
      plus.people.get({
        userId: 'me',
        auth: oauth2Client
      }, function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  formatUserData: function formatUserData(result, tokens) {
    var email = result.emails[0].value;
    var birthday = result.birthday;
    var user_data = {
      name: result.displayName,
      email: email,
      gender: result.gender,
      picture: result.image.url,
      language: (0, _.normalizeLocale)(result.language),
      google: {
        id: result.id,
        accessToken: tokens.access_token,
        expires: (0, _moment2.default)(tokens.expiry_date),
        idToken: tokens.id_token
      }
    };
    if (birthday) user_data.birthday = (0, _moment2.default)(birthday);
    return user_data;
  }
};