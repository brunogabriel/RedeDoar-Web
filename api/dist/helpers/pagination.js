'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getPage: function getPage(req) {
    var page = parseInt(req.query.page || 1);
    if (page <= 0) page = 1;
    return page;
  },
  getLimit: function getLimit(req) {
    var limit = parseInt(req.query.limit || 10);
    return limit;
  },
  getParams: function getParams(req, model, params) {
    var options = {};
    var filter = req.query.filter || null;
    var search = req.query.search || null;
    var category = req.query.category || null;
    var latitude = req.query.latitude || null;
    var longitude = req.query.longitude || null;
    var maxDistance = parseInt(req.query.maxDistance || 8000);

    if (filter && search) {
      options[filter] = new RegExp('.*' + search + '.*', 'ig');
    }
    if (category) {
      options.category = category;
    }
    if (latitude && longitude) {
      options['location.latlng'] = {
        $near: [longitude, latitude],
        $maxDistance: maxDistance
      };
    }
    if (params) {
      options = _lodash2.default.merge(params, options);
    }

    return options;
  },
  getOptions: function getOptions(req, model, options) {
    var page = this.getPage(req);
    var limit = this.getLimit(req);
    options.page = page;
    options.limit = limit;
    var order = req.query.order || null;
    if (order) {
      order = this.parseOrder(order, model);
      if (order) options.sort = order;
    }
    return options;
  },
  parseOrder: function parseOrder(order, model) {
    var direction = '+';
    var field = order.replace(' ', '+');
    if (field[0] == '+' || field[0] == '-') {
      direction = field[0];
      field = field.substring(1);
    }
    var keys = _lodash2.default.keys(model.schema.paths);
    if (_lodash2.default.includes(keys, field)) {
      if (direction == '+') order = field;
      return order;
    }
  },
  paginate: function paginate(model, req) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    params = this.getParams(req, model, params);
    options = this.getOptions(req, model, options);
    return model.paginate(params, options).then(function (result) {
      var data = result.docs;
      delete result.docs;
      return { data: data, paging: result };
    });
  }
};