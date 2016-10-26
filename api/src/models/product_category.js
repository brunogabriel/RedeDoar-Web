import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const Image = mongoose.Schema({
  filename: String,
  directory: String
}, {
  timestamps: false
})

const schema = mongoose.Schema({
  name: String,
  image: Image
}, {
  timestamps: true
})

schema.plugin(mongoosePaginate)

schema.methods.getImageOptions = function () {
  return {
    output: `public/uploads/product_categories/${this.id}/`,
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
        width: 400,
        height: 400
      }
    }
  }
}

schema.methods.patchEntity = function (data) {
  this.set('name', data.name)
  return this
}

export default mongoose.model('ProductCategory', schema)
