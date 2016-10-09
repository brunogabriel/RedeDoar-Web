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

schema.methods.patchEntity = function (data) {
  this.set('title', data.title)
  this.set('description', data.description)
  this.set('delivery', data.delivery)
  this.set('condition', data.condition)
  this.set('category', data.category)
  this.set('contact_type', data.contact_type)
  this.set('contact_value', data.contact_value)
  this.set('location', data.location)
  return this
}

schema.methods.getImageOptions = function () {
  return {
    output: 'public/uploads/products/' + this.id + '/',
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
  }
}

export default mongoose.model('Product', schema)
