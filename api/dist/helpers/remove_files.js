'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeFiles = function removeFiles(files) {
  if (files) {
    files.forEach(function (item) {
      if (item.path) {
        _fs2.default.unlink(item.path);
      }
    });
  }
};

exports.default = removeFiles;