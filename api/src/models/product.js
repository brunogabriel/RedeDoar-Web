import mongoose from 'mongoose'

const Image = mongoose.Schema({
  filename: String,
  directory: String
}, {
  timestamps: false
})

const Comment = mongoose.Schema({
  comment: {
    type: String,
    minlength: [3, 'Digite seu comentário']
  },
  reply: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const schema = mongoose.Schema({
  title: String,
  description: String,
  location: {
    context: String,
    latlng: {
      type: [Number],
      index: '2d',
      sparse: true
    }
  },
  delivery: String,
  condition: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory'
  },
  images: [Image],
  comments: [Comment],
  contact_type: String,
  contact_value: String
}, {
  timestamps: true
})

export default mongoose.model('Product', schema)
