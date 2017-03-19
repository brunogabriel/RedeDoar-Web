'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _googleapis = require('googleapis');

var _googleapis2 = _interopRequireDefault(_googleapis);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var OAuth2 = _googleapis2.default.auth.OAuth2;
  var oauth2Client = new OAuth2(_config2.default.google.appId, _config2.default.google.appSecret, _config2.default.google.redirectUri);
  if (req.query.token) {} else {
    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: _config2.default.google.scopes
    });
    res.redirect(url);
  }
};