'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hat = require('hat');

var _hat2 = _interopRequireDefault(_hat);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  fileFilterImage: function fileFilterImage(req, file, cb) {
    if (_lodash2.default.startsWith(file.mimetype, 'image')) {
      cb(null, true);
    } else {
      cb(new Error('Arquivo inválido, precisa ser uma imagem: jpg, png ou gif'));
    }
  },
  diskStorageDefault: {
    destination: function destination(req, file, cb) {
      cb(null, 'tmp');
    },
    filename: function filename(req, file, cb) {
      var originalname = file.originalname;
      var extension = originalname.split('.').reverse().shift();
      var filename = (0, _hat2.default)() + '.' + extension;
      cb(null, filename);
    }
  }
};