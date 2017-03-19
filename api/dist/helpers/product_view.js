'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

exports.default = {
  prepareData: function prepareData(products) {
    var _this = this;

    if ('map' in products) {
      return products.map(function (product) {
        product = _this.prepareDataItem(product);
        return product;
      });
    } else {
      products = this.prepareDataItem(products);
      return products;
    }
  },
  prepareDataItem: function prepareDataItem(product) {
    for (var i in product.images) {
      var image = product.images[i];
      if (image.filename) {
        image.set('loader', this.getFullPath(image, 'loader'), { strict: false });
        image.set('thumb', this.getFullPath(image, 'thumb'), { strict: false });
        image.set('large', this.getFullPath(image, 'large'), { strict: false });
        product.images[i] = image;
      }
    }
    product.set('delivery_label', this.getDeliveryLabel(product.delivery), { strict: false });
    return product;
  },
  getFullPath: function getFullPath(image, size) {
    var directory = image.directory.replace('public', '');
    return _.asset.url('' + directory + size + '_' + image.filename);
  },
  getDeliveryLabel: function getDeliveryLabel(delivery) {
    delivery = parseInt(delivery);
    var map = {
      1: 'em mãos',
      2: 'a combinar'
    };
    return map[delivery] ? map[delivery] : 'não informado';
  },
  getConditionLabel: function getConditionLabel(condition) {
    condition = parseInt(condition);
    var map = {
      1: 'novo',
      2: 'usado'
    };
    return map[condition] ? map[condition] : 'não informado';
  }
};