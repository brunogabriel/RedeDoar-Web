'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.generateBcrypt = undefined;

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateBcrypt = exports.generateBcrypt = function generateBcrypt(value) {
  var SALT_WORK_FACTOR = 10;
  var salt = _bcryptNodejs2.default.genSaltSync(SALT_WORK_FACTOR);
  var hash = _bcryptNodejs2.default.hashSync(value, salt);
  if (!hash) throw new Error(__('Erro ao gerar hash'));
  return hash;
};

var comparePassword = exports.comparePassword = function comparePassword(value1, value2) {
  return _bcryptNodejs2.default.compareSync(value1, value2);
};