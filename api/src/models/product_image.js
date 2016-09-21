import mongoose from 'mongoose'

const schema = mongoose.Schema({
  file: String
}, {
  timestamps: true
})

export default mongoose.model('ProductImage', schema)
