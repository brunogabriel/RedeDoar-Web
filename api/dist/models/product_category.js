'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = _mongoose2.default.Schema({
  filename: String,
  directory: String
}, {
  timestamps: false
});

var schema = _mongoose2.default.Schema({
  name: String,
  image: Image
}, {
  timestamps: true
});

schema.plugin(_mongoosePaginate2.default);

schema.methods.getImageOptions = function () {
  return {
    output: 'public/uploads/product_categories/' + this.id + '/',
    sizes: {
      thumb: {
        width: 100,
        height: 100
      },
      loader: {
        width: 100,
        height: 100,
        quality: 0.1
      },
      large: {
        width: 256,
        height: 256
      }
    }
  };
};

schema.methods.patchEntity = function (data) {
  this.set('name', data.name);
  return this;
};

exports.default = _mongoose2.default.model('ProductCategory', schema);