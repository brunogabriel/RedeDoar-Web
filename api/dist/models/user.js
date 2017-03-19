'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _helpers = require('../helpers');

var _params = require('params');

var _params2 = _interopRequireDefault(_params);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var schema = _mongoose2.default.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  birthday: Date,
  phone: String,
  picture: String,
  language: String,
  facebook: {
    id: String,
    accessToken: String,
    lastRefresh: Date,
    expires: Date
  },
  google: {
    id: String,
    accessToken: String,
    idToken: String,
    expires: Date
  },
  mobileDevices: [{
    pushId: String,
    platform: String,
    lastUpdate: {
      type: Date,
      default: Date.now
    }
  }],
  termsOfUse: {
    type: Boolean,
    validate: [{
      validator: function validator(value) {
        return !!value;
      },
      msg: 'Você precisa aceitar os termos de uso!'
    }]
  },
  active: {
    type: Boolean,
    default: true
  },
  products: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  tokens: [{
    token: String,
    expires: Date,
    platform: {
      type: String,
      enum: ['web', 'android', 'ios']
    }
  }]
}, {
  timestamps: true
});

schema.plugin(_mongoosePaginate2.default);

schema.statics.loginFields = ['name', 'email', 'gender', 'picture', 'birthday', 'language', 'active'];

schema.statics.exceptFieldsCreate = ['active', 'mobileDevices', 'products'];

schema.statics.hasFacebookId = function (facebook_id) {
  return this.findOne({ 'facebook.id': facebook_id }).exec();
};

schema.statics.hasGoogleId = function (google_id) {
  return this.findOne({ 'google.id': google_id }).exec();
};

schema.statics.createAccount = function (data) {
  data = (0, _params2.default)(data).except(this.exceptFieldsCreate);
  data.birthday = (0, _moment2.default)(data.birthday, 'DD/MM/YYYY').toDate();
  return new this(data).save();
};

schema.statics.byAccessToken = function (access_token, network) {
  network = network || 'facebook';
  return this.findOne(_defineProperty({}, network + '.accessToken', access_token)).exec();
};

schema.statics.byNetworkId = function (id, network) {
  network = network || 'facebook';
  return this.findOne(_defineProperty({}, network + '.id', id)).exec();
};

schema.statics.disable = function (user) {
  user.set('active', false);
  return user;
};

schema.statics.loginAccount = function (data) {
  return this.findOne({ email: data.email, active: true }).then(function (user) {
    if (user) {
      if (user.validPassword(data.password)) {
        return user;
      } else {
        throw new Error('Dados inválidos');
      }
    } else {
      throw new Error('Dados inválidos');
    }
  });
};

schema.statics.loginWithToken = function (token) {
  var query = {
    $or: [{
      'facebook.accessToken': token
    }, {
      'google.accessToken': token
    }],
    active: true
  };
  return this.findOne(query).select(schema.statics.loginFields.join(' ')).then(function (user) {
    if (user) {
      return user;
    } else {
      throw new Error('Token inválido');
    }
  });
};

schema.statics.dataLoginResponse = function (user, req) {
  return {
    success: true,
    data: user
  };
};

schema.methods.validPassword = function (compare_password) {
  return (0, _helpers.comparePassword)(compare_password, this.password);
};

schema.methods.updateAccount = function (data) {
  for (var field in data) {
    this.set(field, data[field]);
  }
  return this.save();
};

schema.pre('save', function (next) {
  this.password = (0, _helpers.generateBcrypt)(this.password);
  next();
});

exports.default = _mongoose2.default.model('User', schema);