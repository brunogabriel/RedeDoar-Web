'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var host = process.env.HOST || 'localhost';
var port = parseInt(process.env.PORT || 8000);

_i18n2.default.configure({
  locales: ['en', 'pt-br'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  cookie: 'rededoarapi',
  queryParameter: 'language'
});

app.listen(port, host);
app.use(_i18n2.default.init);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use((0, _compression2.default)());
app.use((0, _cors2.default)());
app.options('*', (0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json({ limit: '20mb' }));
app.use((0, _cookieParser2.default)());
app.use((0, _cookieSession2.default)({
  name: 'friendly_donations',
  keys: ['456hds0a48d9eyj089712i0ueytwaew46wo545asf24asd10'],
  maxAge: 24 * 60 * 60 * 1000
}));
app.use('/', _routes2.default);

exports.default = app;