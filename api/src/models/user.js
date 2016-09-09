import mongoose from 'mongoose'

const schema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  birthday: Date,
  phone: String,
  score: Number,
  picture: String,
  language: String,
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
  }]
}, {
  timestamps: true
})

schema.statics.hasFacebookId = function(facebook_id) {
  return this.findOne({ 'facebook.id': facebook_id }).exec()
}

schema.statics.createAccount = function(data) {
  return new this(data).save()
}

schema.statics.byAccessToken = function(access_token) {
  return this.findOne({ 'facebook.accessToken': access_token }).exec()
}

export default mongoose.model('User', schema)
