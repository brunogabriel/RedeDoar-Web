'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _models = require('../../../models');

var _helpers = require('../../../helpers');

var _filters = require('../../filters');

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _show = require('./show');

var _show2 = _interopRequireDefault(_show);

var _edit = require('./edit');

var _edit2 = _interopRequireDefault(_edit);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var storage = _multer2.default.diskStorage(_helpers.uploadUtils.diskStorageDefault);
var upload = (0, _multer2.default)({ storage: storage, fileFilter: _helpers.uploadUtils.fileFilterImage });

router.post('/', _filters.adminAuthenticated, _list2.default);
router.post('/add', upload.any(), _filters.adminAuthenticated, _add2.default);
router.post('/:product_category_id', _filters.adminAuthenticated, _filters.validProductCategory, _show2.default);
router.post('/:product_category_id/edit', upload.any(), _filters.adminAuthenticated, _filters.validProductCategory, _edit2.default);
router.post('/:product_category_id/remove', _filters.adminAuthenticated, _filters.validProductCategory, _remove2.default);

exports.default = router;