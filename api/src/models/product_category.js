import mongoose from 'mongoose'

const schema = mongoose.Schema({
  name: String,
  image: String
}, {
  timestamps: true
})

export default mongoose.model('ProductCategory', schema)
