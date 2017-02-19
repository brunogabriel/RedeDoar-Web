import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const schema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  birthday: Date,
  phone: String,
  score: Number,
  picture: String,
  language: String,
  password: String,
  facebook: {
    id: String,
    accessToken: String,
    lastRefresh: Date,
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
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
})

schema.plugin(mongoosePaginate)

schema.statics.hasFacebookId = function(facebook_id) {
  return this.findOne({ 'facebook.id': facebook_id }).exec()
}

schema.statics.createAccount = function(data) {
  return new this(data).save()
}

schema.statics.byAccessToken = function(access_token) {
  return this.findOne({ 'facebook.accessToken': access_token }).exec()
}

schema.statics.disable = function (user) {
  user.set('active', false)
  return user
}

schema.methods.validPassword = function (compare_password) {
  return this.password == compare_password
}

export default mongoose.model('User', schema)
