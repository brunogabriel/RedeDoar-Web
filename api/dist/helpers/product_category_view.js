'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

exports.default = {
  prepareData: function prepareData(product_categories) {
    var _this = this;

    if ('map' in product_categories) {
      return product_categories.map(function (product_category) {
        product_category = _this.prepareDataItem(product_category);
        return product_category;
      });
    } else {
      product_categories = this.prepareDataItem(product_categories);
      return product_categories;
    }
  },
  prepareDataItem: function prepareDataItem(product_category) {
    var image = product_category.image;
    if (image) {
      image.set('loader', this.getFullPath(image, 'loader'), { strict: false });
      image.set('thumb', this.getFullPath(image, 'thumb'), { strict: false });
      image.set('large', this.getFullPath(image, 'large'), { strict: false });
      product_category.image = image;
    }
    return product_category;
  },
  getFullPath: function getFullPath(image, size) {
    var directory = image.directory.replace('public', '');
    return _.asset.url('' + directory + size + '_' + image.filename);
  }
};