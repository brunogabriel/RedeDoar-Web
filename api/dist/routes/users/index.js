'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fb = require('fb');

var _fb2 = _interopRequireDefault(_fb);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _filters = require('../filters');

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _facebook = require('./facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _facebook_callback = require('./facebook_callback');

var _facebook_callback2 = _interopRequireDefault(_facebook_callback);

var _google = require('./google');

var _google2 = _interopRequireDefault(_google);

var _google_callback = require('./google_callback');

var _google_callback2 = _interopRequireDefault(_google_callback);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

var _disable = require('./disable');

var _disable2 = _interopRequireDefault(_disable);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// @todo: mover configuracao do facebook para um facebookUtils
_fb2.default.options({
  appId: _config2.default.facebook.appId,
  appSecret: _config2.default.facebook.appSecret,
  redirectUri: _config2.default.facebook.redirectUri
});

router.post('/', _create2.default);
router.post('/login', _login2.default);
router.get('/login/facebook', _facebook2.default);
router.get('/login/google', _google2.default);
router.get('/facebook/callback', _facebook_callback2.default);
router.get('/google/callback', _google_callback2.default);
router.post('/profile', _filters.authenticated, _profile2.default);
router.post('/disable', _filters.authenticated, _disable2.default);

exports.default = router;