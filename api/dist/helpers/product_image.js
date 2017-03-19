'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  remove: function remove(image) {
    try {
      var loader = image.directory + 'loader_' + image.filename;
      var thumb = image.directory + 'thumb_' + image.filename;
      var large = image.directory + 'large_' + image.filename;
      _fs2.default.unlinkSync(loader);
      _fs2.default.unlinkSync(thumb);
      _fs2.default.unlinkSync(large);
    } catch (e) {
      console.log(e);
    }
  },
  removeDirectory: function removeDirectory(product) {
    if (product.images.length > 0) {
      (function () {
        var path = product.images[0].directory;
        if (_fs2.default.existsSync(path)) {
          _fs2.default.readdirSync(path).forEach(function (file, index) {
            var cur_path = path + '/' + file;
            if (_fs2.default.lstatSync(cur_path).isDirectory()) {
              deleteFolderRecursive(cur_path);
            } else {
              _fs2.default.unlinkSync(cur_path);
            }
          });
          _fs2.default.rmdirSync(path);
        }
      })();
    }
  }
};