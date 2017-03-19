'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = _mongoose2.default.Schema({
  filename: String,
  directory: String
}, {
  timestamps: false
});

var Comment = _mongoose2.default.Schema({
  comment: {
    type: String,
    required: [true, 'Digite seu comentário']
  },
  reply: String,
  user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var schema = _mongoose2.default.Schema({
  title: {
    type: String,
    required: [true, 'Digite um título']
  },
  description: {
    type: String,
    required: [true, 'Digite uma descrição da doação']
  },
  location: {
    context: String,
    latlng: {
      type: [Number],
      index: '2d',
      sparse: true
    }
  },
  delivery: {
    type: String,
    required: [true, 'Informe a forma de entrega da doação']
  },
  condition: {
    type: String,
    required: [true, 'Coloque a condição do item']
  },
  email: String,
  telephone: String,
  category: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'ProductCategory'
  },
  user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [Image],
  comments: [Comment],
  active: {
    type: Boolean,
    default: true
  },
  to_user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  state: {
    type: String,
    enum: ['donated', 'canceled']
  }
}, {
  timestamps: true
});

schema.plugin(_mongoosePaginate2.default);

schema.methods.patchEntity = function (data) {
  this.set('title', data.title);
  this.set('description', data.description);
  this.set('delivery', data.delivery);
  this.set('condition', data.condition);
  this.set('category', data.category);
  this.set('contact_type', data.contact_type);
  this.set('contact_value', data.contact_value);
  this.set('location', data.location);
  return this;
};

schema.methods.getImageOptions = function () {
  return {
    output: 'public/uploads/products/' + this.id + '/',
    max_files: 5,
    sizes: {
      thumb: {
        width: 100,
        height: 100
      },
      loader: {
        width: 100,
        height: 100,
        quality: 0.1
      },
      large: {
        width: 800,
        height: 800
      }
    }
  };
};

schema.path('email').validate(function (value) {
  return this.email || this.telephone;
}, 'Você precisa informar um e-mail ou telefone.');

schema.path('delivery').validate(function (value) {
  var accept = [1, 2];
  return accept.indexOf(parseInt(value), accept) > -1;
}, 'Valores aceitos: 1 e 2');

exports.default = _mongoose2.default.model('Product', schema);