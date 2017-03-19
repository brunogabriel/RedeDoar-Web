'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema({
  user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Product'
  }
}, {
  timestamps: true
});

exports.default = _mongoose2.default.model('ProductFavorite', schema);