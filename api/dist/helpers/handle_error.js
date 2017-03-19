'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getMessage: function getMessage(error) {
    if (!error.errors && error.message) {
      return error.message;
    } else {
      var messages = [];
      if (error.errors) {
        for (var i in error.errors) {
          messages.push(error.errors[i].message);
        }
      }
      return _lodash2.default.uniq(messages).join(', ');
    }
  }
};