'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _imagemagick = require('imagemagick');

var _imagemagick2 = _interopRequireDefault(_imagemagick);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('./');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imCrop = _bluebird2.default.promisify(_imagemagick2.default.crop);

var cropFiles = function cropFiles(files, config) {
  var items = [];
  var promises = [];

  if (files) {
    (function () {
      try {
        _fs2.default.accessSync(config.output);
      } catch (err) {
        if (err.code === 'ENOENT') {
          _fs2.default.mkdirSync(config.output);
        }
      }
      var max_files = 1;
      if (config.max_files) max_files = parseInt(config.max_files);
      files.map(function (file, i) {
        if (i < max_files) {
          for (var size in config.sizes) {
            var default_options = {
              srcPath: file.path,
              dstPath: config.output + size + '_' + file.filename,
              quality: 0.7,
              format: 'jpg'
            };
            var options = _lodash2.default.assign(default_options, config.sizes[size]);
            promises.push(imCrop(options));
          }
          items.push({
            filename: file.filename,
            directory: config.output
          });
        }
      });
      _bluebird2.default.all(promises).then(function (err) {
        (0, _2.removeFiles)(files);
      });
    })();
  }
  return items;
};

exports.default = cropFiles;