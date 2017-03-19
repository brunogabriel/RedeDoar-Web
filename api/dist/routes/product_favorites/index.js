'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _filters = require('../filters');

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _list2.default);
router.post('/add', _filters.validProduct, _add2.default);
router.post('/:id/remove', _remove2.default);

exports.default = router;