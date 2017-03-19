'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _hat = require('hat');

var _hat2 = _interopRequireDefault(_hat);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../../models');

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _edit = require('./edit');

var _edit2 = _interopRequireDefault(_edit);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _close = require('./close');

var _close2 = _interopRequireDefault(_close);

var _show = require('./show');

var _show2 = _interopRequireDefault(_show);

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'tmp');
  },
  filename: function filename(req, file, cb) {
    var originalname = file.originalname;
    var extension = originalname.split('.').reverse().shift();
    var filename = (0, _hat2.default)() + '.' + extension;
    cb(null, filename);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (_lodash2.default.startsWith(file.mimetype, 'image')) {
    cb(null, true);
  } else {
    cb(new Error('Arquivo inválido, precisa ser uma imagem: jpg, png ou gif'));
  }
};

var upload = (0, _multer2.default)({ storage: storage, fileFilter: fileFilter });

router.get('/', _list2.default);
router.post('/add', upload.any(), _filters.authenticated, _add2.default);
router.get('/:product_id', _show2.default);
router.post('/:product_id/comment', _filters.authenticated, _filters.validProduct, _comment2.default);
router.post('/:product_id/edit', upload.any(), _filters.authenticated, _filters.validProductUser, _edit2.default);
router.post('/:product_id/remove', _filters.authenticated, _filters.validProductUser, _remove2.default);
router.post('/:product_id/close', _filters.authenticated, _filters.validProductUser, _close2.default);

exports.default = router;