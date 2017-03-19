'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeLocale = exports.googleUtils = exports.api = exports.uploadUtils = exports.pagination = exports.asset = exports.productCategoryImage = exports.productImage = exports.productCategoryView = exports.productView = exports.handleError = exports.removeFiles = exports.cropFiles = undefined;

var _security = require('./security');

Object.keys(_security).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _security[key];
    }
  });
});

var _crop_files = require('./crop_files');

var _crop_files2 = _interopRequireDefault(_crop_files);

var _remove_files = require('./remove_files');

var _remove_files2 = _interopRequireDefault(_remove_files);

var _handle_error = require('./handle_error');

var _handle_error2 = _interopRequireDefault(_handle_error);

var _product_view = require('./product_view');

var _product_view2 = _interopRequireDefault(_product_view);

var _product_category_view = require('./product_category_view');

var _product_category_view2 = _interopRequireDefault(_product_category_view);

var _product_image = require('./product_image');

var _product_image2 = _interopRequireDefault(_product_image);

var _product_category_image = require('./product_category_image');

var _product_category_image2 = _interopRequireDefault(_product_category_image);

var _asset2 = require('./asset');

var _asset3 = _interopRequireDefault(_asset2);

var _pagination2 = require('./pagination');

var _pagination3 = _interopRequireDefault(_pagination2);

var _upload_utils = require('./upload_utils');

var _upload_utils2 = _interopRequireDefault(_upload_utils);

var _api2 = require('./api');

var _api3 = _interopRequireDefault(_api2);

var _google_utils = require('./google_utils');

var _google_utils2 = _interopRequireDefault(_google_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.cropFiles = _crop_files2.default;
exports.removeFiles = _remove_files2.default;
exports.handleError = _handle_error2.default;
exports.productView = _product_view2.default;
exports.productCategoryView = _product_category_view2.default;
exports.productImage = _product_image2.default;
exports.productCategoryImage = _product_category_image2.default;
exports.asset = _asset3.default;
exports.pagination = _pagination3.default;
exports.uploadUtils = _upload_utils2.default;
exports.api = _api3.default;
exports.googleUtils = _google_utils2.default;
var normalizeLocale = exports.normalizeLocale = function normalizeLocale(locale) {
  return locale.toLowerCase().replace('_', '-');
};