import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const Image = mongoose.Schema({
  filename: String,
  directory: String
}, {
  timestamps: false
})

const Comment = mongoose.Schema({
  comment: {
    type: String,
    required: [true, 'Digite seu comentário']
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [Image],
  comments: [Comment],
  contact_type: {
    type: String,
    required: [true, 'Informe a forma de contato que prefere receber']
  },
  contact_value: {
    type: String,
    required: [true, 'Informe o contato para a doação']
  },
  active: {
    type: Boolean,
    default: true
  },
  to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  state: {
    type: String,
    enum: ['donated', 'canceled']
  }
}, {
  timestamps: true
})

schema.plugin(mongoosePaginate)

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

// schema.path('state').validate(function (value) {
//   return /donated|canceled/i.test(value)
// }, 'Invalid color')

export default mongoose.model('Product', schema)
