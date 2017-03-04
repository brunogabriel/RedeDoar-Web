import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import { generateBcrypt, comparePassword } from '../helpers'
import params from 'params'
import moment from 'moment'

const schema = mongoose.Schema({
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
      validator: function (value) { return !!value },
      msg: 'Você precisa aceitar os termos de uso!'
    }]
  },
  active: {
    type: Boolean,
    default: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
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
})

schema.plugin(mongoosePaginate)

schema.statics.exceptFieldsCreate = [
  'facebook',
  'google',
  'active',
  'mobileDevices',
  'products'
]

schema.statics.hasFacebookId = function(facebook_id) {
  return this.findOne({ 'facebook.id': facebook_id }).exec()
}

schema.statics.hasGoogleId = function(google_id) {
  return this.findOne({ 'google.id': google_id }).exec()
}

schema.statics.createAccount = function(data) {
  data = params(data).except(this.exceptFieldsCreate)
  data.birthday = moment(data.birthday, 'DD/MM/YYYY').toDate()
  return new this(data).save()
}

schema.statics.byAccessToken = function(access_token, network) {
  network = network || 'facebook'
  return this.findOne({ [`${network}.accessToken`]: access_token }).exec()
}

schema.statics.byNetworkId = function(id, network) {
  network = network || 'facebook'
  return this.findOne({ [`${network}.id`]: id }).exec()
}

schema.statics.disable = function (user) {
  user.set('active', false)
  return user
}

schema.statics.loginAccount = function (data) {
  return this.findOne({ email: data.email }).then((user) => {
    if (user) {
      if (user.validPassword(data.password)) {
        return user
      } else {
        throw new Error('Dados inválidos')
      }
    } else {
      throw new Error('Dados inválidos')
    }
  })
}

schema.methods.validPassword = function (compare_password) {
  return comparePassword(compare_password, this.password)
}

schema.methods.updateAccount = function (data) {
  for (let field in data) {
    this.set(field, data[field])
  }
  return this.save()
}

schema.pre('save', function (next) {
  this.password = generateBcrypt(this.password)
  next()
})

export default mongoose.model('User', schema)
