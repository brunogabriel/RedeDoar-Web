import mongoose from 'mongoose'
import crypto from 'crypto'

const schema = mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  token: String
}, {
  timestamps: true
})

schema.statics.byToken = function(token) {
  return this.findOne({ token: token }).exec()
}

schema.statics.authUser = function(data) {
  const options = {
    username: data.username,
    password: this.getHash(data.password)
  }
  return this.findOne(options).exec()
}

schema.statics.createUser = function(data) {
  data.password = this.getHash(data.password)
  return new this(data).save()
}

schema.statics.getHash = function(password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return hash
}

schema.methods.generateToken = function() {
  const random = Math.random()
  const token = crypto.createHash('sha256').update(random.toString()).digest('hex')
  this.set('token', token)
  return this.save()
}

export default mongoose.model('AdminUser', schema)
