'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = _bluebird2.default;
var database = process.env.MONGODB_URI;
if (process.env.NODE_ENV == 'test') {
  database = process.env.MONGODB_URI_TEST;
}
_mongoose2.default.connect(database).then(function () {
  if (process.env.DROP_DATABASE == true) {
    _mongoose2.default.connection.db.dropDatabase(function () {
      console.log('- Drop database');
    });
  }
});