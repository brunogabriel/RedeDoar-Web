'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  token: String
}, {
  timestamps: true
});

schema.statics.byToken = function (token) {
  return this.findOne({ token: token }).exec();
};

schema.statics.authUser = function (data) {
  var options = {
    username: data.username,
    password: this.getHash(data.password)
  };
  return this.findOne(options).exec();
};

schema.statics.createUser = function (data) {
  data.password = this.getHash(data.password);
  return new this(data).save();
};

schema.statics.getHash = function (password) {
  var hash = _crypto2.default.createHash('sha256').update(password).digest('hex');
  return hash;
};

schema.methods.generateToken = function () {
  var random = Math.random();
  var token = _crypto2.default.createHash('sha256').update(random.toString()).digest('hex');
  this.set('token', token);
  return this.save();
};

exports.default = _mongoose2.default.model('AdminUser', schema);