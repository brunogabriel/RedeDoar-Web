import { asset } from './'

export default {
  prepareData: function(product_categories) {
    if ('map' in product_categories) {
      return product_categories.map((product_category) => {
        product_category = this.prepareDataItem(product_category)
        return product_category
      })
    } else {
      product_categories = this.prepareDataItem(product_categories)
      return product_categories
    }
  },
  prepareDataItem: function(product_category) {
    let image = product_category.image
    if (image) {
      image.set('loader', this.getFullPath(image, 'loader'), { strict: false })
      image.set('thumb', this.getFullPath(image, 'thumb'), { strict: false })
      image.set('large', this.getFullPath(image, 'large'), { strict: false })
      product_category.image = image
    }
    return product_category
  },
  getFullPath: function(image, size) {
    let directory = image.directory.replace('public', '')
    return asset.url(`${directory}${size}_${image.filename}`)
  }
}
