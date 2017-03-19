'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _show = require('./show');

var _show2 = _interopRequireDefault(_show);

var _changeStatus = require('./change-status');

var _changeStatus2 = _interopRequireDefault(_changeStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _list2.default);
router.post('/:id', _show2.default);
router.post('/:id/change-status', _changeStatus2.default);

exports.default = router;