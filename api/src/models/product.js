import mongoose from 'mongoose'

// Artigo interessante: http://blog.robertonodi.me/how-to-use-geospatial-indexing-in-mongodb-using-express-and-mongoose/

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
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductImage'
  }],
  contact_type: String,
  contact_value: String
}, {
  timestamps: true
})

export default mongoose.model('Product', schema)
